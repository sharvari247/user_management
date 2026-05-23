//create role table
export const CREATE_ROLE_TABLE = `
    CREATE TABLE IF NOT EXISTS roles (
        role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        role_name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        hierarchy_level INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// create user_roles table
export const CREATE_USER_ROLE_TABLE = `
    CREATE TABLE IF NOT EXISTS user_roles (
        user_role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        role_id UUID REFERENCES roles(role_id) ON DELETE CASCADE,
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, role_id)
    );
`;

// insert role
export const INSERT_ROLE = `
    INSERT INTO roles (role_name,description,hierarchy_level)
    VALUES ($1, $2, $3)
    RETURNING *;
`;

// get all roles
export const GET_ALL_ROLES = `
    SELECT * FROM roles
    ORDER BY hierarchy_level DESC;
`;

// find role by name
export const FIND_ROLE_BY_NAME = `
    SELECT * FROM roles
    WHERE role_name = $1;
`;

// find role by id
export const FIND_ROLE_BY_ID = `
    SELECT * FROM roles
    WHERE role_id = $1;
`;

// assign role to user
export const ASSIGN_ROLE_TO_USER = `
    INSERT INTO user_roles (user_id,role_id)
    VALUES ($1, $2)
    RETURNING *;
`;

// get roles of a user
export const GET_USER_ROLES = `
    SELECT r.role_id, r.role_name, r.description, r.hierarchy_level
    FROM roles r
    INNER JOIN user_roles ur
    ON r.role_id = ur.role_id
    WHERE ur.user_id = $1;
`;

// remove role from user
export const REMOVE_ROLE_FROM_USER = `
    DELETE FROM user_roles
    WHERE user_id = $1
    AND role_id = $2;
`;
