const {db} = require('./db2')
const fs = require('fs');
const readline = require('node:readline')

let count = 3;
console.log(db)

const readAndStore = (i) => {
  const event = fs.createReadStream(`/Users/dillonarmstrong/Hack/Quanswers/ETL/questions-${i}.csv`)
  const read = readline.createInterface({
    input: event,
    crlfDelay: Infinity,
  });

  read.on('error', (error) => {
    throw Error(error.message);
  })

  read.on('line', (line) => {
    let data = line.toString().split('\n')

    const breakItDown = (data) => {
      data.map(line => {
        const items = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        if (items[6] === '1') {
          items[6] = true;
        } else {
          items[6] = false;
        }
        if (items.length === 8) {
          db.query(`INSERT INTO "questions"
          ("question_id",
          "product_id",
          "question_body",
          "question_date",
          "asker_name",
          "asker_email",
          "reported",
          "question_helpfulness")
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, items)
          .then(result => {
            console.log('Written to questions')
          })
          .catch(err => {
            console.log(err, items)
            //event.destroy()
          })
        } else {
          console.log('DATA ISSUES! STOP FUNCTIONS!', items)
          event.destroy()
        }
      });
    }
    breakItDown(data)
  });

  read.on('finish', (finish) => {
    console.log('done with' + count, finish)
    readAndStore(count)
  });

}

// readAndStore(count); 0 1 2
// count++

readAndStore(count);
count++;