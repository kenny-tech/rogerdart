
export const userQueries = {
    SIGN_IN:`SELECT id, first_name, last_name, username, user_email, user_mobile, user_pass, user_address, user_country, linkedin, facebook, created_at FROM users WHERE user_email = ?`,
    FIND_USER_BY_EMAIL: `SELECT id, first_name, last_name, username, user_email, user_mobile, isActivated, confirmationCode, user_country, user_address, linkedin, facebook, created_at FROM users WHERE user_email = ?`,
    FIND_USER_BY_CODE: `SELECT id, first_name, last_name, user_email, user_pass, created_at FROM users WHERE resetCode = ?`,
    GET_ALL_USERS: `SELECT first_name, last_name, username, user_email, user_mobile, user_country, linkedin, facebook, created_at FROM users`,
    GET_USER_BY_ID: `SELECT id, first_name, last_name, username, user_email, user_mobile, user_country, user_address, linkedin, facebook, created_at FROM users WHERE id = ?`,
    UPDATE_USER: `UPDATE users SET first_name = ?, last_name = ?, username = ?, user_email = ?, user_mobile = ?, user_country = ?, user_address = ?, linkedin = ?, facebook = ? WHERE id = ?`,
    UPDATE_USER_PASS: `UPDATE users SET user_pass = ? WHERE resetCode = ?`,
    UPDATE_RESET_CODE: `UPDATE users SET resetCode = ? WHERE user_email = ?`,
    UPDATE_USER_CONFIRMATION_CODE: `UPDATE users SET confirmationCode = ?, isActivated = 1 WHERE user_email = ?`,
    CREATE_ACCOUNT:`INSERT INTO users (first_name, last_name, user_email,  
        user_mobile, user_pass, confirmationCode) 
        VALUES(?, ?, ?, ?, ?, ?)`,
}