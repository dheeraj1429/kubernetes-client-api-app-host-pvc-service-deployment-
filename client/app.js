const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', async (req, res, next) => {
   const response = await axios.get(`${process.env.API_ADDRESS}/get-data`);

   return res.render('index', {
      message: response?.data?.message,
      ip: process.env?.POD_IP || 'there is not pod',
   });
});

app.get('/log', async (req, res, next) => {
   // const response = await axios.get(
   //    `http://${process.env.API_ADDRESS}:8000/logs`
   // );
   const response = await axios.get(`${process.env.API_ADDRESS}/logs`);

   return res.render('log', {
      log: response?.data?.log,
   });
});

app.listen(3000, () => {
   console.log('client run in port 3000');
});
