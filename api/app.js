const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/get-data', (req, res, next) => {
   return res.status(200).json({
      message: 'api is working',
   });
});

app.post('/store-logs', (req, res, next) => {
   const { log } = req.body;
   if (!log) {
      return res.status(400).json({
         message: 'Log is required',
      });
   }

   const folderPath = path.join(__dirname, 'db', 'log.txt');

   fs.writeFileSync(folderPath, log, 'utf-8');

   return res.status(200).json({
      log: log,
   });
});

app.get('/logs', (req, res, next) => {
   const folderPath = path.join(__dirname, 'db', 'log.txt');
   fs.readFile(folderPath, 'utf-8', (err, data) => {
      if (err) {
         console.log(err);
      }

      return res.status(200).json({
         log: data,
      });
   });
});

app.get('/error', (req, res, next) => {
   process.exit(1);
});

app.listen(8000, () => {
   console.log('api server running in port 8000');
});
