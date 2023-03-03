
export const paymentQueries = {
    CREATE_PAYMENT:`INSERT INTO payment (user_id, vendor_id, product_id, order_no, transaction_ref, total, status, quantity, modified_at)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
}