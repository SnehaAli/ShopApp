const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

/* a file path (p) to the products.json file */
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

/* a function getProductsFromFile which reads the content of the products.json file and 
parses it as JSON. If there's an error reading the file, it returns an empty array, otherwise,
 it returns the parsed JSON data via a callback function. */

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

/* exports a Product class with the following methods:
constructor: Initializes a new product with title, imageUrl, description, and price. */
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  /*Generates a random id for the product, then reads the existing products from the file,
   adds the new product to the list, and writes the updated list back to the file as JSON.*/
  save() {
    getProductsFromFile(products => {
      if(this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] =this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  /* Deleting the product and getting the id of item which is to be deleted 
  */

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const Updatedproduct = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        if(!err){
          Cart.deleteProduct(id, product.price);
        }

      });
      
    });
  }

  /*A static method that retrieves all products from the file 
  using the getProductsFromFile function and passes them to a callback.
   */
  static fetchAll(cb) {
    getProductsFromFile(cb); 
   }

   /* A static method that retrieves a product by its id from the 
   file using the getProductsFromFile function and passes it to a callback. */
  static findById(id,cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
