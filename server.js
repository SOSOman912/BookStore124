const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('cookie-session');
const {WebhookClient , Card, Suggestion} = require('dialogflow-fulfillment');
const { Pool, Client } = require("pg");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const app = express();
const port = process.env.PORT || 5000

const pool = new Pool({
    connectionString: 'postgres://eznxnvpxfqdhmm:3eaeb97fb42d2c9ab35defcbbcc0fad1f34e31aba5c2f9c1371cda56f70d4440@ec2-52-45-73-150.compute-1.amazonaws.com:5432/d7mefmitu75ame',
    ssl: {
      rejectUnauthorized:false
    }
  });
const UploadingDataToPostgreSQL = async(data) => {
  const query = `INSERT INTO customerinformation (user_id, username, email)VALUES('${data.user_id}','${data.username}','${data.email}')`;
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

const RetrievingDatasFromPostgreSQLforBasicfunction = async() => {
    const query = `SELECT * FROM booksinformation WHERE id < 100` ;
  try {
    
    const client = await pool.connect();
    const res = await client.query(query);
    return res.rows;

  } catch (err) {
    console.log(err);
  }
}

const RetrievingDatasFromPostgreSQL = async() => {
    const query = `SELECT * FROM booksinformation` ;
  try {
    const client = await pool.connect();
    const res = await client.query(query);
    app.set("booksinformation",res.rows);
    return res.rows;

  } catch (err) {
    console.log(err);
  }
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

pool.on('error', (err, client) => {
  console.error('Error:',err);
})

if (process.env.NODE_ENV !== 'production') require('dotenv').config();



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
      const content = request.body;
      const requirement = {
          shoestype: content.queryResult.parameters.shoestype,
          SportType: content.queryResult.parameters.SportType,
          Shoesbrand: content.queryResult.parameters.Shoesbrand,
          gender: content.queryResult.parameters.gender
      }
      app.set("ProductRequirement",requirement);

      var possibleResponse = [
      'Of course! Is there any or more requirement?',
      `May I know is there any or more requirement on the ${requirement.shoestype} ?`
      ]

      var pick = Math.floor (Math.random() * possibleResponse.length );

      var response = possibleResponse[pick];
      
      agent.add(response);
    }

    const NoForLookforproduct = async (agent) => {
        const content = request.body.queryResult.outputContexts[0].parameters;
        var number = 0;
        app.set("number",number);
        var requirement = app.get("ProductRequirement");

      const productdata = app.get("booksinformation");
      if (requirement.shoestype != null) {
        var array1 = productdata.filter(data => {
          if (data.product_name.toLowerCase().includes(requirement.shoestype) == true) {
            return data;
          }
        })
      } else {
        var array1 = productdata;
      }

      if (requirement.SportType != null) {
        var array2 = array1.filter(data => {
          if (data.product_name.toLowerCase().includes(requirement.SportType) == true) {
            return data;
          }
        })
      } else {
        var array2 = array1;
      }

      if (requirement.Shoesbrand != null) {
        var array3 = array2.filter(data => {
          if (data.product_name.toLowerCase().includes(requirement.Shoesbrand) == true) {
            return data;
          }
        })
      } else {
        var array3 = array2;
      }

      if (requirement.Shoesbrand != null) {
        var array4 = array3.filter(data => {
          if (data.gender.toLowerCase().includes(requirement.gender) == true) {
            return data;
          }
        })
      } else {
        var array4 = array3;
      }

      var Itemtoshow = number;
      var Imagetoshow = array4[Itemtoshow].images.split(',');

      agent.add(new Card({
        title: array4[Itemtoshow].product_name,
        imageUrl: Imagetoshow[Itemtoshow],
        text: 'This is the body text of a card'
      }));
      
      agent.add(new Suggestion(`Please help me to add this ${requirement.gender? requirement.gender : ''} ${requirement.Shoesbrand? requirement.Shoesbrand : ''} ${requirement.SportType? requirement.SportType : ''} ${requirement.shoestype} to my cart list`));
      agent.add(new Suggestion(`I don't like this ${requirement.gender? requirement.gender : ''} ${requirement.Shoesbrand? requirement.Shoesbrand : ''} ${requirement.SportType? requirement.SportType : ''} ${requirement.shoestype}, Can you suggest Me another one?`));
      };

      const SuggestAnotherProduct = async (agent) => {  

      const content = request.body.queryResult.outputContexts[0].parameters;
      var requirement = app.get("ProductRequirement");
      var number = app.get("number");
      number = number + 1;
      app.set("number",number);

      const productdata = app.get("booksinformation");
      if (requirement.shoestype != null) {
        var array1 = productdata.filter(data => {
          if (data.product_name.toLowerCase().includes(requirement.shoestype) == true) {
            return data;
          }
        })
      } else {
        var array1 = productdata;
      }

      if (requirement.SportType != null) {
        var array2 = array1.filter(data => {
          if (data.product_name.toLowerCase().includes(requirement.SportType) == true) {
            return data;
          }
        })
      } else {
        var array2 = array1;
      }

      if (requirement.Shoesbrand != null) {
        var array3 = array2.filter(data => {
          if (data.product_name.toLowerCase().includes(requirement.Shoesbrand) == true) {
            return data;
          }
        })
      } else {
        var array3 = array2;
      }

      if (requirement.Shoesbrand != null) {
        var array4 = array3.filter(data => {
          if (data.gender.toLowerCase().includes(requirement.gender) == true) {
            return data;
          }
        })
      } else {
        var array4 = array3;
      }

      var Itemtoshow = number;
      var Imagetoshow = array4[Itemtoshow].images.split(',');

      agent.add(new Card({
        title: array4[Itemtoshow].product_name,
        imageUrl: Imagetoshow[Itemtoshow],
        text: 'This is the body text of a card'
      }));
      agent.add(new Suggestion(`Please help me to add this ${requirement.gender? requirement.gender : ''} ${requirement.Shoesbrand? requirement.Shoesbrand : ''} ${requirement.SportType? requirement.SportType : ''} ${requirement.shoestype} to my cart list`));
      agent.add(new Suggestion(`I don't like this ${requirement.gender? requirement.gender : ''} ${requirement.Shoesbrand? requirement.Shoesbrand : ''} ${requirement.SportType? requirement.SportType : ''} ${requirement.shoestype}, Can you suggest Me another one?`));
      };

      const AddingShoesToCartListWithChatBot = async(agent) => {
        const content = request.body.queryResult.outputContexts[0].parameters;
      var requirement = app.get("ProductRequirement");

      const productdata = app.get("booksinformation");
      if (requirement.shoestype != null) {
        var array1 = productdata.filter(data => {
          if (data.product_name.toLowerCase().includes(requirement.shoestype) == true) {
            return data;
          }
        })
      } else {
        var array1 = productdata;
      }

      if (requirement.SportType != null) {
        var array2 = array1.filter(data => {
          if (data.product_name.toLowerCase().includes(requirement.SportType) == true) {
            return data;
          }
        })
      } else {
        var array2 = array1;
      }

      if (requirement.Shoesbrand != null) {
        var array3 = array2.filter(data => {
          if (data.product_name.toLowerCase().includes(requirement.Shoesbrand) == true) {
            return data;
          }
        })
      } else {
        var array3 = array2;
      }

      if (requirement.Shoesbrand != null) {
        var array4 = array3.filter(data => {
          if (data.gender.toLowerCase().includes(requirement.gender) == true) {
            return data;
          }
        })
      } else {
        var array4 = array3;
      }

      var Itemtoshow = number;

      const snapshot = 
      {
        product_id:array4[number].product_id,
        quantity:1
      }
      console.log("Item to added to database with chatbot:",snapshot)
      var Origincartlist = app.get('updatedCartlist');
      console.log("CurrentCartListState:",Origincartlist);
      var AddedToDatabaseWithChatbot = Origincartlist.push(snapshot);
      app.set('updatedCartlist',AddedToDatabaseWithChatbot);      
      console.log(Origincartlist);
      var currentUser = app.get('currentUser');
      const itemlist = JSON.stringify(Origincartlist);
      AddingShoesToCartList(currentUser[0],itemlist);

      agent.add("Your shoes have already been added into the cartlist, before you pay your bill, please reflesh the pages first.");
      }

    let intentMap = new Map();
    intentMap.set("Welcome", Welcome);
    intentMap.set("Lookforproduct", Lookforproduct);
    intentMap.set("Lookforproduct - no", NoForLookforproduct);
    intentMap.set("Lookforproduct-no-Move to other shoes", SuggestAnotherProduct);
    intentMap.set("Lookforproduct-no-additemtocart", AddingShoesToCartListWithChatBot );
    agent.handleRequest(intentMap)
  }

app.get('/getDataForBasicUse', async(req, res) => {
    var ResData = await RetrievingDatasFromPostgreSQLforBasicfunction();
    res.send(ResData);  
})

app.get('/getData', async(req, res) => {
    
    var ResData = await RetrievingDatasFromPostgreSQL();
    res.send(ResData);  
})

app.post('/updatecartlist', async(req,res) => {
    const snapshot = req.body.cartlist.map(item => (
          {
            product_id: item.product_id,
            quantity: item.quantity
          }
        ));
    const itemlist = JSON.stringify(snapshot);
    console.log(snapshot);
    app.set('updatedCartlist',snapshot);
    AddingShoesToCartList(req.body.users,itemlist);
})

app.post('/userDocumentUpload', (request, response) => {
  UploadingDataToPostgreSQL(request.body);
});

app.get('/login', async (request, response) => {
  var ProductData = app.get("booksinformation");
  var customerdata = await GetcustomerInformation(request.query.user_id);

  app.set('currentUser',customerdata);
  console.log(customerdata[0].cart_list);
  app.set('updatedCartlist',customerdata[0].cart_list);

  if(customerdata[0].cart_list) { 
    var TranformingCartList = customerdata[0].cart_list.map(cartItem => {
      for (var i = 0; i< ProductData.length; i++) {
        if (cartItem.product_id == ProductData[i].product_id) {
          return {...ProductData[i], quantity: cartItem.quantity};
        }}})}
    else {
      var TranformingCartList = [];
    }
  

  const ResData = {
    user_id: customerdata[0].user_id,
    username: customerdata[0].username,
    email: customerdata[0].email,
    cart_list: TranformingCartList
  }



  response.send(ResData);
});

app.get('/checkifexist', async (request,response) => {
  var ResData = await CheckIfCustomerExisted(request.query.user_id);

  response.send(ResData);

})




