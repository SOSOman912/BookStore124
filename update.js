const {Client, Pool} = require('pg')
const fs = require('fs');

let rawdata = fs.readFileSync('./books.json');
let books = JSON.parse(rawdata);


async function run() {

  const pool = new Pool({
      connectionString: 'postgres://eznxnvpxfqdhmm:3eaeb97fb42d2c9ab35defcbbcc0fad1f34e31aba5c2f9c1371cda56f70d4440@ec2-52-45-73-150.compute-1.amazonaws.com:5432/d7mefmitu75ame',
      ssl: {
        rejectUnauthorized:false
      }
    });

  async function fetch(pool) {
      try {
        const client = await pool.connect();
        let query = `SELECT * FROM booksinformation `;
        const res = await client.query(query);
        client.release();
        return res.rows;
      } catch (err) {
        console.log(err);
      }
    }

  const dataSet = await fetch(pool);

  let data = JSON.stringify(dataSet);
  fs.writeFileSync('data.json',data);
}

run();










