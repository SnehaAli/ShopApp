const fs = require('fs');
const path = require('path');
const { compile } = require('pug');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    //
    static addProduct(id, productPrice) {
        //fetch per cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            else if(err){
                console.log(err);
            }
            //analayse the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //add new product/ increase quantity 
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct; 
            } else {
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });      
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err,fileContent) => {
            const updatedCart = {...cart};
            //fetching the id of delete item
            const product = updatedCart.product.find(prod => prod.id === id);
            
            //putting all item except the deleted one
            updatedCart.product = updatedCart.product.filter(
                prod => prod.id !== id
                );
            //fetching the quantity 
            const quantity = product.qty;
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * quantity; 

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }
}