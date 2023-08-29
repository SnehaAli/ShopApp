const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
  );

module.exports = class Cark {
    static addProduct(id, productPrice) {
        //fetch per cart
        fs.readFileSync(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            //analayse the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty +1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;


            } else {
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + productPrice;
        });
        
        //add new product/ increase quantity 
    }

}