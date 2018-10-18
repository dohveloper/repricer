const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://dohveloper:"+process.env.MONGO_ATLAS_PW+"<PASSWORD>@cluster0-up08t.mongodb.net/test?retryWrites=true",
{
  useMongoClient: true
}
);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
module.exports = app;
dafdf
