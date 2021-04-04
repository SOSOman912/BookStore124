const {Client, Pool} = require('pg')
const fs = require('fs');

let rawdata = fs.readFileSync('./books.json');
let books = JSON.parse(rawdata);

const pool = new Pool({
    connectionString: 'postgres://eznxnvpxfqdhmm:3eaeb97fb42d2c9ab35defcbbcc0fad1f34e31aba5c2f9c1371cda56f70d4440@ec2-52-45-73-150.compute-1.amazonaws.com:5432/d7mefmitu75ame',
    ssl: {
      rejectUnauthorized:false
    }
  });



async function run(book,pool) {
  try {
    const client = await pool.connect();
    const number = Math.floor(Math.random()*(30-10) + 10);
    console.log(number);
    // let query = `SELECT * FROM booksinformation `;
    let query = `UPDATE booksinformation SET sale_price = '${number}' WHERE id = ${book.id} `;
    const res = await client.query(query);
    client.release();
    console.log(res.rows);
  } catch (err) {
    console.log(err);
  }
}

  books.forEach(async(book) => {
      await run(book,pool);
  })









