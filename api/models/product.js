
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    rank: Number,
    id:{
      productID: Number,
      categoryID: Number,
      mallID: Number,
      comparisonID: Number
    },
    option:[{
      option1:String,
      option2:String,
      option3:String,
      optionPrice: Number,
      stock: Number,
      sku: String,
      hidden: Boolean
    }],
    repricer:{
      isActive: Boolean,
      activeTime: [Number],
      targetRank: Number,
      recoveryPrice: Number,
      priceHighLimit: Number,
      priceLowLimit: Number,
      history: [{
        date:Date,
        rank: Number,
        price: Number
      }],
      unit: Number,
      lowest: {mallName: String, price: Number}
});

module.exports = mongoose.model('Product', productSchema);
