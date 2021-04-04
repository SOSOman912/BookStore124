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

    let query = `INSERT INTO booksinformation (id,book_id, best_book_id,
                                               work_id,books_count,isbn
                                               isbn13,authors,original_publication_year,
                                               original_title,title,language_code,
                                               average_rating,ratings_count,
                                               work_ratings_count,work_text_reviews_count,
                                               ratings_1,ratings_2,ratings_3,
                                               ratings_4,ratings_5,image_url,
                                               small_image_url
                            )VALUES('${book.id}','${book.book_id}','${book.best_book_id}','${book.work_id}'
                            ,'${book.books_count}','${book.isbn}','${book.isbn13}','${book.authors}','${book.original_publication_year}'
                            ,'${book.original_title}','${book.title}','${book.language_code}',${book.average_rating},${book.ratings_count}
                            ,'${book.work_ratings_count}','${book.work_text_reviews_count}','${book.ratings_1}','${book.ratings_2}'
                            ,'${book.ratings_3}','${book.ratings_4},'${book.ratings_5}','${book.image_url}','${book.small_image_url}'
                            )`;

pool.connect((err, client, done) => {
  if (err) throw err;
  try {
    books.forEach(book => {
      client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log("inserted " + res.rowCount + " row:", row);
        }
      });
    });
  } finally {
    done();
  }
});








