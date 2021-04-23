const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const {WebhookClient , Card, Suggestion} = require('dialogflow-fulfillment');
const { Pool, Client } = require("pg");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const collaborativeFilter = require('./collaborative_filtering/script.js');
const fs = require('fs');
const SendingConfirmationEmail = require('./SendingEmail/ConfirmationEmail.js');


const app = express();
const port = process.env.PORT || 5000

const pool = new Pool({
    connectionString: 'postgres://eznxnvpxfqdhmm:3eaeb97fb42d2c9ab35defcbbcc0fad1f34e31aba5c2f9c1371cda56f70d4440@ec2-52-45-73-150.compute-1.amazonaws.com:5432/d7mefmitu75ame',
    ssl: {
      rejectUnauthorized:false
    }
  });

app.use(session({
  secret: 'Igotoschoolbybus',
  cookie: { maxAge: 60 * 1000},
  resave: true,
  saveUninitialized: true
}));


const UploadingDataToPostgreSQL = async(data) => {
  const query = `INSERT INTO customerinformation (user_id, username, email, cart_list, created_on, status, confirmationcode)VALUES('${data.user_id}','${data.username}','${data.email}','${data.cart_list}','${data.created_on}','${data.status}','${data.confirmationcode}')`;
  try {
    const client = await pool.connect();
      client.query(query);
  } catch (err) {
    console.log(err);
  }
}

const GetcustomerDatabase = async(data) => {
  const query = `SELECT * FROM customerinformation`
  try {
    const client = await pool.connect();
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

const GetcustomerInformation = async(data) => {
  const query = `SELECT * FROM customerinformation WHERE user_id = '${data}'`
  try {
    const client = await pool.connect();
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

// const RetrievingDatasFromPostgreSQLforBasicfunction = async() => {
//     const query = `SELECT * FROM booksinformation WHERE id < 100` ;
//   try {
    
//     const client = await pool.connect();
//     const res = await client.query(query);
//     return res.rows;

//   } catch (err) {
//     console.log(err);
//   }
// }

const RetrievingDatasFromPostgreSQL = async() => {
    let rawdata = fs.readFileSync('./books.json');
    let dataset = JSON.parse(rawdata);
    return dataset;
}

const CheckIfCustomerExisted = async(data) => {
  const query = `SELECT EXISTS(SELECT true FROM customerinformation WHERE user_id = '${data}')`
  try {
    const client = await pool.connect();
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

// const ChangeCustomerstatus = async(data) => {
//   const query = `UPDATE customerinformation SET status = 'Active' WHERE confirmationcode = '${}'`
// }

const AddingShoesToCartList = async(data,itemlist) => {
  const query = `UPDATE customerinformation SET cart_list = '${itemlist}' WHERE user_id = '${data.user_id}'`
  console.log(query);
  try {
    const client = await pool.connect();
    const res = await client.query(query);
    console.log('CartList Update SUCCESS');
    console.log(res.rows);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
//   });
// }

// pool.on('error', (err, client) => {
//   console.error('Error:',err);
// })

// if (process.env.NODE_ENV !== 'production') require('dotenv').config();



app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  console.log(body);

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

app.post('/chatBot', (request, response) => {
        dialogflowFulfillment(request, response);
})

const dialogflowFulfillment = async(request, response) => {

  const agent = new WebhookClient({request, response})
    const Welcome = (agent) => {
      var possibleResponse = [
      "Hello! How can I help you?",
      "Good day! What can I do for you today?",
      "Greetings! how can I assist?"
      ]

      var pick = Math.floor( Math.random() * possibleResponse.length );

      var response = possibleResponse[pick];

      agent.add(response);
    }

    const Lookforproduct = (agent) => {
      
      agent.add('Sure');
      agent.add('Do you want me to recommend a random book to you or recommend base on your requirement?');
      agent.add(new Suggestion('Just recommend me random book'));
      agent.add(new Suggestion('Please provide books base on my requirement'));
    }

    const RandomBook = (agent) => {
      var productdata = app.get("booksinformation");

      function compare (a,b) {
        if (a.average_rating < b.average_rating) {
          return 1;
        }
        if( a.average_rating > b.average_rating) {
          return -1;
        }
        return;
      }

      var Sortedproductdata = productdata.sort(compare);

      // for (var i = 0 ; i < productdata.length; i++) {
      //   if (productdata[i].average_rating > product.average_rating) {
      //     product = productdata[i];
      //   }
      // }
      app.set("booksinformation",productdata);

      app.set("RandomBookNumber",0);

      app.set("RandomBookList",Sortedproductdata)

      var product = Sortedproductdata[0];

      agent.add(new Card({
        title: product.title,
        imageUrl: product.small_image_url,
        text: `Author:${product.authors}`
      }));
      agent.add(`This product is being introduced to you since it has the highest average_rating of ${product.average_rating}`);
      agent.add(new Suggestion('Add this book to my cartlist please'));
      agent.add(new Suggestion('Show me another book please'));
    }

    const ShowAnotherRandomBook = (agent) => {

      var number = app.get("RandomBookNumber");

      const Booklist = app.get("RandomBookList");

      var number = number + 1;

      app.set("RandomBookNumber",number);

      app.set("RandomBookList",Booklist);

      var product = Booklist[number];

      agent.add(new Card({
        title: product.title,
        imageUrl: product.small_image_url,
        text: `Author:${product.authors}`
      }));
      agent.add(`This product is being introduced to you since it has the highest average_rating of ${product.average_rating}`);
      agent.add(new Suggestion('Add this book to my cartlist please'));
      agent.add(new Suggestion('Show me another book please'));
    }

    const ShowAnotherSpecificBook = (agent) => {

      var number = app.get("specificRequirementNumber");

      const list = app.get("specificbooklist");

      var number = number + 1;

      app.set("specificRequirementNumber",number);

      app.set("specificbooklist",list);

      var product = list[number];

      var listlength = list.length;

      agent.add(new Card({
        title: product.title,
        imageUrl: product.small_image_url,
        text: `Author:${product.authors}`
      }));
    agent.add(`This books is the ${number + 1} books that meet your requirement, there are total ${listlength} books in the list`);
    agent.add(new Suggestion('This is the book that I want to find!!!!'));
    agent.add(new Suggestion('This is not the book I want, show me another book please'));

    }


      const AddingBooksToCartListWithChatBot = async(agent) => {
      const content = request.body.queryResult.outputContexts[0].parameters;

      const Booklist = app.get("RandomBookList");

      var number = app.get("RandomBookNumber");

      var Itemtoshow = number;

      const snapshot = 
      {
        product_id:Booklist[Itemtoshow].id,
        quantity:1
      }

      console.log("Item to added to database with chatbot:",snapshot)
      var Origincartlist = app.get('updatedCartlist');
      console.log("CurrentCartListState:",Origincartlist);
      var AddedToDatabaseWithChatbot = Origincartlist.push(snapshot);
      app.set('updatedCartlist',AddedToDatabaseWithChatbot);      
      var currentUser = app.get('currentUser');
      console.log(currentUser);
      const itemlist = JSON.stringify(Origincartlist);
      AddingShoesToCartList(currentUser[0],itemlist);
      app.set('currentUser',currentUser);

      agent.add("Your shoes have already been added into the cartlist, before you pay your bill, please reflesh the pages first.");
      }

      const AddingSpecificBooksToCartListWithChatBot = async(agent) => {

      const Booklist = app.get("specificbooklist");

      var number = app.get("specificRequirementNumber");

      var Itemtoshow = number;

      const snapshot = 
      {
        product_id:Booklist[Itemtoshow].id,
        quantity:1
      }

      console.log("Item to added to database with chatbot:",snapshot)
      var Origincartlist = app.get('updatedCartlist');
      console.log("CurrentCartListState:",Origincartlist);
      var AddedToDatabaseWithChatbot = Origincartlist.push(snapshot);
      app.set('updatedCartlist',AddedToDatabaseWithChatbot);      
      var currentUser = app.get('currentUser');
      console.log(currentUser);
      const itemlist = JSON.stringify(Origincartlist);
      AddingShoesToCartList(currentUser[0],itemlist);
      app.set('currentUser',currentUser);

      agent.add("Your shoes have already been added into the cartlist, before you pay your bill, please reflesh the pages first.");
      }

      const SpecificBook = async(agent) => {
      agent.add("To receive recommendation from a book, You need to provide data for me to analysis");
      agent.add("Can you provide the bookid of the book you want to find?");
      agent.add("If yes, please enter the bookid, otherwise please press the button");
      agent.add(new Suggestion("I don't have the bookid"));
      }

      const ReceiveId = async(agent) => {
      if (request.body.queryResult.parameters.id) {
        var Requirement = {
        id:request.body.queryResult.parameters.id
        }
      } else {
        var Requirement = {
          id:null
        }
      }
      
    
      app.set("Requirement",Requirement);

      agent.add("Can you provide the isbn code of the book you want to find?");
      agent.add("If yes, please enter the isbn code, otherwise please press the button");
      agent.add(new Suggestion("I don't have the isbn code"));
      }

      const ReceiveIsbn = async(agent) => {
      var Requirement = app.get("Requirement");
      if (request.body.queryResult.parameters.isbn) {
        var Requirement = {
        ...Requirement,
        isbn:request.body.queryResult.parameters.isbn
        }
      } else {
        var Requirement = {
        ...Requirement,
        isbn:null
        }
      }
      
      app.set("Requirement",Requirement);

      agent.add("Can you provide the authors of the book you want to find?");
      agent.add("If yes, please enter the name of the authors, otherwise please press the button");
      agent.add(new Suggestion("I don't have the specific authors"));
    }

    const ReceiveAuthors = async(agent) => {
      var Requirement = app.get("Requirement");
      var booksinformation = app.get("booksinformation");
      if (request.body.queryResult.parameters.authors) {
        var Requirement = {
        ...Requirement,
        authors:request.body.queryResult.parameters.authors
        }
      } else {
        var Requirement = {
        ...Requirement,
        authors:null
        }
      }

    console.log(Requirement);


    const list = booksinformation.filter(book => Requirement.id != null ? book.id === Requirement.id : book).filter(book => Requirement.isbn != null ? book.isbn == Requirement.isbn : book).filter(book => Requirement.authors != null ? book.authors == Requirement.authors.name : book );

    app.set("booksinformation",booksinformation);

    app.set("specificbooklist", list);

    var number = 0;

    var product = list[number];

    var listlength = list.length;

    app.set("specificRequirementNumber",number);

    agent.add(new Card({
      title: product.title,
      imageUrl: product.small_image_url,
      text: `Author:${product.authors}`
    }));
    agent.add(`This books is the ${number + 1} books that meet your requirement, there are total ${listlength} books in the list`);
    agent.add(new Suggestion('This is the book that I want to find!!!!'));
    agent.add(new Suggestion('This is not the book I want, show me another book please'));

    }


    let intentMap = new Map();
    intentMap.set("Welcome", Welcome);
    intentMap.set("Lookforproduct", Lookforproduct);
    intentMap.set("randombook", RandomBook);
    intentMap.set("AnotherRandomBook",ShowAnotherRandomBook);
    intentMap.set("AddBooksToCart", AddingBooksToCartListWithChatBot);
    intentMap.set("SpecificBook", SpecificBook);
    intentMap.set("SpecificBook - Receive id", ReceiveId);
    intentMap.set("SpecificBook - Receive isbn", ReceiveIsbn);
    intentMap.set("SpecificBook - Receive authors", ReceiveAuthors);
    intentMap.set("SpecificBook - AddBookToCartlist", AddingSpecificBooksToCartListWithChatBot);
    intentMap.set("AnotherSpecificBook",ShowAnotherSpecificBook);


    agent.handleRequest(intentMap)
  }

app.get('/getData', async(req, res) => { 
    var ResData = await RetrievingDatasFromPostgreSQL();
    app.set("booksinformation",ResData);
    req.session.BookData = ResData;
    res.send(ResData);  
})

app.post('/updatecartlist', async(req,res) => {
    console.log(req.body);
    const snapshot = req.body.cartlist.map(item => (
          {
            product_id: item.id,
            quantity: item.quantity
          }
        ));
    const itemlist = JSON.stringify(snapshot);
    app.set('updatedCartlist',snapshot);
    AddingShoesToCartList(req.body.users,itemlist);
})

app.post('/userDocumentUpload', (request, response) => {
  UploadingDataToPostgreSQL(request.body);  
});

app.get("/confirm/:token", (request, response) => {
  console.log(request.params);
})

app.post('/SendConformationEmail', (request, response) => {
  SendingConfirmationEmail.sendConfirmationEmail(request.body);
})

app.get('/login', async (request, response) => {
  const userid = request.query.user_id;
  console.log("Starting login function:",userid);

  if(userid == null) {
    return [];
  }
  console.log('Get userID, starting fetching')
  var ProductData = await RetrievingDatasFromPostgreSQL();
  var customerdata = await GetcustomerInformation(userid);

  if (customerdata[0].status != "Active") {
    return response.status(401).send({
      message: "Pending Account. Please Verify your Email First !"
    })
  }

  var recommendationList = collaborativeFilter.recomendation_eng('1735');
  if(!customerdata[0].cart_list == null) { 
    var TranformingCartList = customerdata[0].cart_list.map(cartItem => {
      for (var i = 0; i< ProductData.length; i++) {
        if (cartItem.product_id == ProductData[i].id) {
          return {...ProductData[i], quantity: cartItem.quantity};
        }}})}
    else {
      var TranformingCartList = [];
    }

  var TransformingRecommendationList = recommendationList[1].map(recommendationItem => {
    for ( var i = 0; i< ProductData.length; i++ ) {
      if (recommendationItem == ProductData[i].id) {
        return {...ProductData[i]}
      }
    }
  })

  app.set("currentUser",customerdata);
  app.set("updatedCartlist",TranformingCartList);
  console.log('fetching finish, returning data');
  
  const ResData = {
    id: customerdata[0].id,
    user_id: customerdata[0].user_id,
    username: customerdata[0].username,
    email: customerdata[0].email,
    cart_list: TranformingCartList,
    recommendationList: TransformingRecommendationList  
  }

  response.send(ResData);
});

app.get('/checkifexist', async (request,response) => {
  var ResData = await CheckIfCustomerExisted(request.query.user_id);
  console.log(ResData);

  response.send(ResData);

})




