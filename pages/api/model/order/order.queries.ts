
export const orderQueries = {
    GET_ORDER_BY_ID:`SELECT * from orders WHERE user_id = ?`,
    GET_ORDER:`SELECT orders.id, orders.order_no, users.first_name, 
    payment.total, vendors.business_name, orders.billing_address, orders.delivery_contact, 
    orders.deliveryguy_tip, orders.subtotal, payment.total, orders.tax, orders.orderedItems FROM orders 
    INNER JOIN payment ON orders.order_no = payment.order_no 
    INNER JOIN users ON orders.user_id = users.id
    INNER JOIN vendors ON orders.vendor_id = vendors.id  
    WHERE orders.user_id = ?`,
    CREATE_ORDER:`INSERT INTO orders (order_no, user_id, vendor_id, orderedItems, 
        delivery_contact, deliveryguy_tip, subtotal, tax, billing_address, modified_at) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    CREATE_ORDER_DETAILS:``
}