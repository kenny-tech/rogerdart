

// CREATE_USER:`INSERT INTO users (first_name, last_name, 
//   user_email, user_mobile, user_pass, confirmationCode) 
//   VALUES(?, ?, ?, ?, ?, ?)`,
//   GET_VENDORS:`SELECT * FROM vendors`,
//   CREATE_CATEGORY:`INSERT INTO categories(category_image, category_name) VALUES(?, ?)`,
//   GET_CATEGORIES:,
//   GET_TAGS:`SELECT * FROM vendor_cat`,
//   SHOP_PRODUCTS:`select products.id, products.vendor_id, vendors.vendor_name, 
//   categories.category_name, products.item_name, products.image, products.price, 
//   products.delivery_time, products.description, products.created_at from 
//   products inner join vendors on products.vendor_id = vendors.id inner join 
//   categories on products.category_id = categories.id where products.vendor_id = ?`,
//   INSERT_REFRESH_TOKEN:`INSERT INTO atuthentication(user_id, refresh_token) VALUES(?, ?)`,
//   

export const models = {
  GET_ALL_CATEGORIES:`SELECT categories.id, categories.vendor_id, categories.category_image, 
  vendors.vendor_name, categories.category_name, 
  categories.created_at FROM categories INNER JOIN vendors
  ON categories.vendor_id = vendors.id`,
  GET_ALL_TAGS:`SELECT * FROM vendor_cat`,
} 


