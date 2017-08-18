const express = require('express');
const bodyParser = require('body-parser');
const { promisify } = require('util');
const fs = require('fs');

const writeFile = promisify(fs.writeFile);

const app = express();
app.use(bodyParser.text());

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname });
});

app.post('/save', (req, res) => {
  writeFile(
    'index.html',
    `<!DOCTYPE html>
  ${req.body}`
  )
    .then(() => {
      res.sendStatus(204);
    })
    .catch(e => console.log(e));
});

app.listen(4444, null, console.log('listening on 4444'));
