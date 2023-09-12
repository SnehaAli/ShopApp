const Cart = require('./cart');
const db = require('../util/database');


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
  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {
   
  }
  
  static fetchAll() {
    return db.execute('SELECT * FROM products');
   }

  static findById(id){
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]); 
  }
};
