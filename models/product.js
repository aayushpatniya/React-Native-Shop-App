class Product {
  constructor(id, ownerId, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.title = title;
  }
}

export default Product;