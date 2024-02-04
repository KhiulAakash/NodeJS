const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/e-comm', { useNewUrlParser: true, useUnifiedTopology: true });

const ProductSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    category: String
});

const saveInDB = async () => {
    const Product = mongoose.model('products', ProductSchema);
    const query = {
        name: 'name6',
        brand: 'brand6',
        price: 911,
        category: 'mobile'
    };

    let data = new Product(query);
    let result = await data.save();
    console.log(result);
};

// saveInDB();

const updateInDB = async () => {
    const Product = mongoose.model('products', ProductSchema);
    const query = {
        name: 'name6',
    };

    const operation = {
        $set: { name: 'nameUpdate' }
    };

    let result = await Product.updateOne(query, operation);
    console.log(result);
};

// updateInDB();

const deleteInDB=async()=>{
    const Product=mongoose.model('products',ProductSchema);
    let data=await Product.deleteOne({name:'nameUpdate'})
    console.log(data)
}
// deleteInDB();

const findInDB=async()=>{
    const Product=mongoose.model('products',ProductSchema);
    let data=await Product.find({name:'name2'})
    console.log(data)
}
findInDB();