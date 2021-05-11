const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const {WebhookClient , Card, Suggestion, Payload} = require('dialogflow-fulfillment');
const { Pool, Client } = require("pg");
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { dialogflow, Image, } = require('actions-on-google')
const express = require('express');
const router = express.Router();
const enforce = require('express-sslify');

const collaborativeFilter = require('./collaborative_filtering/script.js');
const fs = require('fs');
const SendingConfirmationEmail = require('./SendingEmail/ConfirmationEmail.js');

const app = express();

const port = process.env.PORT || 5000

const pool1 = new Pool({
    connectionString: 'postgres://eznxnvpxfqdhmm:3eaeb97fb42d2c9ab35defcbbcc0fad1f34e31aba5c2f9c1371cda56f70d4440@ec2-52-45-73-150.compute-1.amazonaws.com:5432/d7mefmitu75ame',
    ssl: {
      rejectUnauthorized:false
    }
  });

const pool2 = new Pool({
    connectionString: 'postgres://rzoqfwkemnrmkm:14c1f8e2a97d8566f7d8a104a5ba46b409bea0700c0110072877a67e2c7599fb@ec2-54-87-112-29.compute-1.amazonaws.com:5432/d9t8saa1bg24gm',
    ssl: {
      rejectUnauthorized:false
    }
  });

process.on('uncaughtException', function (err) {
    throw (err);
}); 

app.use(session({
  secret: 'Igotoschoolbybus',
  cookie: { maxAge: 60 * 1000},
  resave: true,
  saveUninitialized: true
}));

const SetRatingToPostgresql = async(data) => {
    console.log("SetRating - Setting Rating to postgresq");
    const query = `INSERT INTO ratinglist (book_id,user_id,rating) VALUES ('${data.bookid}','${data.UserId}','${data.Rating}')`
    try{
      const client = await pool2.connect();
      await client.query(query);
      client.release()
      console.log("SetRating - Setting finish");
    } catch (err) {
      throw (err);
  }
}


const UploadingDataToPostgreSQL = async(data) => {
  console.log("create new accout, account Info:",data);
  var data = JSON.parse(data);
  const query = `INSERT INTO customerinformation (user_id, username, email, cart_list, created_on, status)VALUES('${data.user_id}','${data.username}','${data.email}','${data.cart_list}','${data.created_on}','${data.status}')`;
  try {
    const client = await pool1.connect();
    client.query(query);
    client.release()  
  } catch (err) {
    console.log("account already exist");
  } 
}

const GetcustomerDatabase = async(data) => {
  const query = `SELECT * FROM customerinformation`
  try {
    const client = await pool1.connect();
    const res = await client.query(query);
    client.release()
    return res.rows;
  } catch (err) {
    throw (err);
  }
}

const GetcustomerInformation = async(data) => {
  const query = `SELECT * FROM customerinformation WHERE user_id = '${data}'`
  try {
    console.log("GETcustomerinformatinstart - feching start");
    const client = await pool1.connect();
    const res = await client.query(query);
    client.release()
    return res.rows;
  } catch (err) {
    console.log (err);
  }
}

// const RetrievingDatasFromPostgreSQLforBasicfunction = async() => {
//     const query = `SELECT * FROM booksinformation WHERE id < 100` ;
//   try {
    
//     const client = await pool1.connect();
//     const res = await client.query(query);
//     return res.rows;

//   } catch (err) {
//     throw (err);
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
    const client = await pool1.connect();
    const res = await client.query(query);
    client.release()
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
    const client = await pool1.connect();
    const res = await client.query(query);
    console.log('CartList Update SUCCESS');
    client.release()
    return res.rows;
    client.end();
  } catch (err) {
    throw (err);
  }
}

const ActiveAccount = async(data) => {
  const query = `UPDATE customerinformation SET status = 'Active' WHERE confirmationcode = '${data.params.confirmationCode}'`
  console.log(query);
  try {
    const client = await pool1.connect();
    const res = await client.query(query);
    client.release()
  } catch (err) {
    throw (err);
  }
}

const UpdateHistory = async(data) => {
  const query = `INSERT INTO order_log (id, customer_id, created_at, updated_at, rating, items)VALUES('${data.id}','${data.customer_id}','${data.created_at}','${data.updated_at}','${data.Rating}','${data.Items}')`;
  try {
    const client = await pool1.connect();
    await client.query(query);
    console.log("UpdateHistory - UpdateCompleted")
    client.release()
  } catch (err) {
    throw (err);
  }
}

const GetBuyingHistory = async(data) => {
  const query = `SELECT * FROM order_log WHERE customer_id = '${data.id}'`
  try {
    const client = await pool1.connect();
    const res = await client.query(query);
    client.release()
    return res.rows
  } catch (err) {
    throw (err);
  }
}
 

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors());

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

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

app.post('/api/chatBot', (request, response) => {
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
    }
    const RandomBook = (agent) => {
      agent.add("Do you want me to recommend book base on books average rating or your rating history?");
      const payload = {
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "Base on Rating",
                },
                {
                  "text": "Base on your rating history (Rquire user rating history)"
                }
              ]
            }
          ]
        ]
      }
    agent.add(new Payload(agent.UNSPECIFIED, payload, {sendAsMessage: true, rawPayload: true}));
    }


    const RandomRatingBook = async(agent) => {
      var ProductData = await RetrievingDatasFromPostgreSQL();

      var number = app.get("RandomBookNumber");

      console.log(number);

      if (number == undefined) {
        var number = 0;
      } else {
        number = number + 1;
      }

      function compare (a,b) {
        if (a.average_rating < b.average_rating) {
          return 1;
        }
        if( a.average_rating > b.average_rating) {
          return -1;
        }
        return;
      }

      var Sortedproductdata = ProductData.sort(compare);

      app.set("RandomBookNumber",number);

      app.set("RandomBookList",Sortedproductdata)

      var product = Sortedproductdata[number];

      const payload = {
          "richContent": [
    [
      {
        "type": "image",
        "rawUrl": `${product.image_url}`,
        "accessibilityText": `${product.title}`
      },
      {
        "type": "info",
        "title": `${product.title}`,
        "subtitle": `This book is being recommended to you since it got a high average rating of ${product.average_rating}`,
      },
      {
        "type": "chips",
        "options": [
          {
            "text": "I don't like this book",
          },
          {
            "text": "Add this book to my cart list please"
          }
        ]
      }
    ]
  ]
}
      agent.add(new Payload(agent.UNSPECIFIED, payload, {sendAsMessage: true, rawPayload: true}));
    }

    const ShowAnotherSpecificBook = (agent) => {

      var number = app.get("specificRequirementNumber");

      const list = app.get("specificbooklist");

      var number = number + 1;

      app.set("specificRequirementNumber",number);

      app.set("specificbooklist",list);

      var product = list[number];

      var listlength = list.length;

      const payload = {
          "richContent": [
    [
      {
        "type": "image",
        "rawUrl": `${product.image_url}`,
        "accessibilityText": `${product.title}`
      },
      {
        "type": "info",
        "title": `${product.title}`,
        "subtitle": `This book is being recommended to you since it met all your requirement`,
      },
      {
        "type": "chips",
        "options": [
          {
            "text": "This is not the book I want, show me another book please",
          },
          {
            "text": "This is the book that I want to find!!!!"
          }
        ]
      }
    ]
  ]
}

    agent.add(new Payload(agent.UNSPECIFIED, payload, {sendAsMessage: true, rawPayload: true}));

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
      var Origincartlist = app.get('CurrentCartListState');
      console.log("CurrentCartListState:",Origincartlist);
      Origincartlist.push(snapshot);
      app.set('CurrentCartListState',Origincartlist);    
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
      var Origincartlist = app.get('CurrentCartListState');
      console.log("CurrentCartListState:",Origincartlist);
      Origincartlist.push(snapshot);
      app.set('CurrentCartListState',Origincartlist);      
      var currentUser = app.get('currentUser');
      console.log(currentUser);
      const itemlist = JSON.stringify(Origincartlist);
      AddingShoesToCartList(currentUser[0],itemlist);
      app.set('currentUser',currentUser);

      agent.add("Your shoes have already been added into the cartlist, before you pay your bill, please reflesh the pages first.");
      }

      const SpecificBook = async(agent) => {

      const payload = {
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "I don't have the bookid",
                }
              ]
            }
          ]
        ]
      }

      agent.add("To receive recommendation from a book, You need to provide data for me to analysis");
      agent.add("Can you provide the bookid of the book you want to find?");
      agent.add("If yes, please enter the bookid, otherwise please press the button");
      agent.add(new Payload(agent.UNSPECIFIED, payload, {sendAsMessage: true, rawPayload: true}));
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

    console.log("Specific Books Recommendation",Requirement);
    
    app.set("Requirement",Requirement);

     const payload = {
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "I don't have the isbn code",
                }
              ]
            }
          ]
        ]
      }

      agent.add("Can you provide the isbn code of the book you want to find?");
      agent.add("If yes, please enter the isbn code, otherwise please press the button");
      agent.add(new Payload(agent.UNSPECIFIED, payload, {sendAsMessage: true, rawPayload: true}));
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


      console.log("Specific Books Recommendation",Requirement);
      
      app.set("Requirement",Requirement);

      const payload = {
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "I don't have the specific authors",
                }
              ]
            }
          ]
        ]
      }

      agent.add("Can you provide the authors of the book you want to find?");
      agent.add("If yes, please enter the name of the authors, otherwise please press the button");
      agent.add(new Payload(agent.UNSPECIFIED, payload, {sendAsMessage: true, rawPayload: true}));
    }

    const ReceiveAuthors = async(agent) => {
      var list = app.get("specificbooklist");

      console.log("ChatBookRecommendation:",list);

      if (list == undefined) {
          var Requirement = app.get("Requirement");
          var booksinformation = await RetrievingDatasFromPostgreSQL();
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

        console.log("Specific Books Recommendation",Requirement);

        console.log(Requirement);

        var list = booksinformation.filter(book => Requirement.id != null ? book.id === Requirement.id : book).filter(book => Requirement.isbn != null ? book.isbn == Requirement.isbn : book).filter(book => Requirement.authors != null ? book.authors == Requirement.authors.name : book );

        console.log("Specific Books Recommendation list",list);

      }

      console.log(list);

    app.set("specificbooklist",list);

    var number = app.get("specificRequirementNumber");

    console.log(number);

    if (list.length = 1) {
      var number = 0;
    } else if (number == undefined){
      var number = 0;
    } else {
        number = number + 1;
    }
    

    var product = list[number];

    var listlength = list.length;

    console.log(number);

    app.set("specificRequirementNumber",number);

    const payload = {
          "richContent": [
    [
      {
        "type": "image",
        "rawUrl": `${product.image_url}`,
        "accessibilityText": `${product.title}`
      },
      {
        "type": "info",
        "title": `${product.title}`,
        "subtitle": `This book is being recommended to you since it met all your requirement`,
      },
      {
        "type": "chips",
        "options": [
          {
            "text": "This is not the book I want, show me another book please",
          },
          {
            "text": "This is the book that I want to find!!!!"
          }
        ]
      }
    ]
  ]
}

    agent.add(new Payload(agent.UNSPECIFIED, payload, {sendAsMessage: true, rawPayload: true}));
    }


    let intentMap = new Map();
    intentMap.set("SpecificBook - Receive id", ReceiveId);
    intentMap.set("SpecificBook - Receive isbn", ReceiveIsbn);
    intentMap.set("SpecificBook - Receive authors", ReceiveAuthors);
    intentMap.set("SpecificBook - AddBookToCartlist", AddingSpecificBooksToCartListWithChatBot);
    intentMap.set("AnotherSpecificBook",ShowAnotherSpecificBook);
    intentMap.set("Welcome", Welcome);
    intentMap.set("Lookforproduct", Lookforproduct);
    intentMap.set("randombook", RandomBook);
    intentMap.set("RandomBook - Rating",RandomRatingBook);
    intentMap.set("AddBooksToCart", AddingBooksToCartListWithChatBot);
    intentMap.set("SpecificBook", SpecificBook);


    agent.handleRequest(intentMap)
  }

app.get('/api/getData', async(req, res) => { 
    var ResData = await RetrievingDatasFromPostgreSQL();
    app.set("booksinformation",ResData);
    req.session.BookData = ResData;
    res.send(ResData);  
})

app.post('/api/updatecartlist', async(req,res) => {
    try {
      const snapshot = req.body.cartlist.map(item => (
            {
              product_id: item.id,
              quantity: item.quantity
            } 
          ));
      const itemlist = JSON.stringify(snapshot);
      app.set('updatedCartlist',snapshot);
      AddingShoesToCartList(req.body.users,itemlist);
      res.status(200).send({ success: "Update success" });
    } catch (err) {
      res.status(500).send({ error: err });
    }
})

app.post('/api/userDocumentUpload', (request, response) => {
  try{
  console.log(request.body);
  UploadingDataToPostgreSQL(request.body);  
  response.status(200).send({ success: "Upload success" });
  } catch (err) {
    response.send(500).send({error:err});
  }
});

app.get("/confirm/:token", (request, response) => {
  ActiveAccount(request);
})

app.post('/api/SendConformationEmail', (request, response) => {
  SendingConfirmationEmail.sendConfirmationEmail(request.body);
    response.end("Request Finish");
})

app.post('/api/SetRating', (request, response) => {
  try{
    SetRatingToPostgresql(request.body);
    response.status(200).send({success: "SetRatingSuccess"})
  } catch (err) {
    response.status(500).send({error: err});
  }
})

app.post('/api/updateHistory', (request, response) => {
  try{
      const customerData = app.get("currentUser")
      const CList = request.body.Items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          Rating: false
        }));

      const CCList = JSON.stringify(CList);

      const snapshot = {
          customer_id: customerData[0].id,
          Items: CCList,
          id: request.body.id,
          created_at: request.body.created_at,
          updated_at: request.body.updated_at,
          Rating: request.body.Rating
        }

      app.set("currentUser",customerData);

      UpdateHistory(snapshot);

      response.status(200).send({success: "UploadhistorySuccess"});
  } catch (err) {
      response.status(500).send({error: err});
  }
});

app.get('/api/getBuyingHistory', async(request, response) => {
    console.log("BuyingHistory - Start Fetching Buying History");
    var data = await GetBuyingHistory(request.query);
    var ProductData = await RetrievingDatasFromPostgreSQL();

    for (var i = 0; i < data.length; i++) {
      var OriginalList = data[i].items;
      var TranformingCartList = OriginalList.map(cartItem => {
      for (var i = 0; i< ProductData.length; i++) {
        if (cartItem.product_id == ProductData[i].id) {
          return {...ProductData[i], quantity: cartItem.quantity, UserAlreadyRated: cartItem.Rating};
        }}})

      data[i].items = TranformingCartList;
    }
    console.log("BuyingHistory - Fetched Finished");

    response.send(data);
})

app.get('/api/login', async (request, response) => {
  try {

    const userid = request.query.user_id;

    var existed = await CheckIfCustomerExisted(userid) 

    console.log(existed);

    if (existed[0].exists == false) {
      console.log("Login - Can't find customer account...")
      await UploadingDataToPostgreSQL(request.query.data);
    }

    console.log("Login - Starting login function:",userid);

    if(userid == null) {
      return [];
    }

    console.log('Login - Get userID, starting fetching');
    var ProductData = await RetrievingDatasFromPostgreSQL();
    console.log('Login - Get Product Data');

    console.log("Login - Trying to get customer data");
    var customerdata = await GetcustomerInformation(userid).catch(error => console.log(error));
    console.log("Login - Customer Get:",customerdata);

    if(!customerdata[0].cart_list == []) { 
      console.log("Transforming cartList ......")
      var TranformingCartList = customerdata[0].cart_list.map(cartItem => {
        for (var i = 0; i< ProductData.length; i++) {
          if (cartItem.product_id == ProductData[i].id) {
            return {...ProductData[i], quantity: cartItem.quantity};
          }}})}
      else {
        console.log("CartList is currently Null");
        var TranformingCartList = [];
      }

    request.session.currentUser = customerdata;

    app.set("currentUser",customerdata);
    app.set("updatedCartlist",TranformingCartList);
    app.set("CurrentCartListState",customerdata[0].cart_list)
    console.log('fetching finish, returning data');
    
    const ResData = {
      id: customerdata[0].id,
      user_id: customerdata[0].user_id,
      username: customerdata[0].username,
      email: customerdata[0].email,
      cart_list: TranformingCartList,
    }

    console.log("customer to login:",ResData.cart_list);

    response.send(ResData);
  }catch (err){
    throw (err);
  }
  
});

app.get('/service-worker.js', (req,res) => {
  console.log("serviceworker");
  res.sendFile(path.resolve(__dirname, '..', 'bookstore124/client/src', 'service-worker.js'));
})

app.get('/api/fetchRecommendationList', async (request,response) => {
    var ProductData = await RetrievingDatasFromPostgreSQL();
    console.log("ID:",request.query.id)
    var recommendationList = await collaborativeFilter.recomendation_eng(request.query.id)

    if(!recommendationList == []) {
      var TransformingRecommendationList = recommendationList.map(recommendationItem => {
           
            for ( var i = 0; i< ProductData.length; i++ ) {
              if (recommendationItem == ProductData[i].id) {
                return {...ProductData[i]}
              }
            }
          })
            } else {
              console.log("recommendationList is null")
              var TransformingRecommendationList = [];
            }   
    response.send(TransformingRecommendationList);
})

app.get('/api/checkifexist', async (request,response) => {
  var ResData = await CheckIfCustomerExisted(request.query.user_id);
  response.send(ResData);
})      

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true}))
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
  });
}

pool1.on('error', (err, client) => {
  console.error('Error:',err);
});





