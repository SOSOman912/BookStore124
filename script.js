const fs = require('fs');
const { Pool, Client } = require("pg");
const pgp = require('pg-promise')({
	capSQL: true
});

const pool1 = new Pool({
    connectionString: 'postgres://rzoqfwkemnrmkm:14c1f8e2a97d8566f7d8a104a5ba46b409bea0700c0110072877a67e2c7599fb@ec2-54-87-112-29.compute-1.amazonaws.com:5432/d9t8saa1bg24gm',
    ssl: {
      rejectUnauthorized:false
    }
  });


let rawdata = fs.readFileSync('./collaborative_filtering/ratings.json');
var ratings = JSON.parse(rawdata);

var ratings = ratings.filter(el => el.rating < 3 || el.rating > 4);


// // console.log(Object.keys(ratings).length);

const UploadingDataToPostgreSQL = async(ratings) => {

	const db = pgp;

	const cs = new pgp.helpers.ColumnSet(['book_id','user_id','rating'], {table: 'ratinglist'});

	const query = await pgp.helpers.insert(ratings,cs);

	// for (var i=0; i < object1.length ; i++) {
	// 	if (object2[object1[i].user_id]) {
	// 		object2[object1[i].user_id] = object2[object1[i].user_id] + object1[i].
	// 	}
	// }

	// console.log(object1);

  try {
    const client = await pool1.connect();
    client.query(query);
  } catch (err) {
    console.log(err);
  }
}

UploadingDataToPostgreSQL(ratings);
// const looping = async(data) => {
// 	setTimeout(function() {
// 		console.log(`fetching data`);
// 		i++;
// 		if (i<Object.keys(ratings).length) {
// 			UploadingDataToPostgreSQL(data[i]);
// 		}
// 	}, 100)
// }

// looping(ratings);