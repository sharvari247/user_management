//create user table
export const CREATE_USER_TABLE = `
    CREATE TABLE IF NOT EXISTS users(
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password_hash VARCHAR(300) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100),
        status VARCHAR(20) DEFAULT 'active',
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
`;

// insert user
export const INSERT_USER = `
    INSERT INTO users(email, password_hash, first_name, last_name)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
`;

// find user by email
export const FIND_USER_BY_EMAIL = `
    SELECT * FROM users WHERE email = $1;
`;

// find user by id
export const FIND_USER_BY_ID = `
    SELECT * FROM users WHERE user_id = $1;
`;

// get all users
export const GET_ALL_USERS = `
    SELECT user_id, email, first_name, last_name, status FROM users;
`;

//update user
export const UPDATE_USER = `
    UPDATE users
    SET email = $1 , first_name = $2, last_name = $3, status = $4, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $5
    RETURNING *;
`;

//delete user
export const DELETE_USER = `
    UPDATE users
    SET status = 'inactive', updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $1 ;
    `;
