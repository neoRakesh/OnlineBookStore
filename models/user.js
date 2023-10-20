const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name:{
      type: String,
      required:true
    },
    email:{
      type: String,
      required:true
    },
    cart:{
      items:[
        {
          productId:{type: Schema.Types.ObjectId,ref:'Product', required:true},
          quantity: {type: Number,required:true}
        }
      ]
    }
  }
  
);



userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId){
  const updateCartItems = this.cart.items.filter(item=>{
    return item.productId.toString()!=productId.toString();
  });
  this.cart.items=updateCartItems;
  return this.save();
}
 
userSchema.methods.clearCart= function(){
  this.cart={items:[]};
  return this.save();
}
module.exports = mongoose.model('User', userSchema);




// class User{
//   constructor(username,email,cart,id){
//     this.name=username;
//     this.email=email;
//     this.cart=cart;
//     this._id=id;
//   }

//   save(){
//     const db=getDb();
//     return db.collection('users').insertOne(this);
//   }

//   addToCart(product){


//     const updateCart={items: [{...product, quantity: 1}]};
//     const db= getDb();
//     return db
//     .collection('users')
//     .updateOne({_id: new ObjectId(this._id)},
//     {$set:{cart: updateCart}}
//     );
//   }



//   static findById(userId){
//     const db=getDb();
//     return db.collection('users').findOne({_id: new ObjectId(userId)})
  
//   }
  


