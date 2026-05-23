import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../../utils/query";

import {
    INSERT_USER,
    FIND_USER_BY_EMAIL,
    FIND_USER_BY_ID,
    GET_ALL_USERS,
    UPDATE_USER,
    DELETE_USER,
} from "./users.queries";

interface CreateUserPayload {
    email: string;
    password: string;
    first_name: string;
    last_name?: string;
    status?: string;
}

export const registerUser = async (payload: CreateUserPayload) => {
    const { email, password, first_name, last_name } = payload;

    const existingUser = await query(FIND_USER_BY_EMAIL, [email]);

    if (existingUser.rows.length > 0) {
        throw new Error("User already exists");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await query(INSERT_USER, [
        email,
        password_hash,
        first_name,
        last_name,
    ]);

    const user = result.rows[0];

    delete user.password_hash;

    return user;
};

export const loginUser = async (email: string, password: string) => {
    const result = await query(FIND_USER_BY_EMAIL, [email]);

    if (result.rows.length === 0) {
        throw new Error("Invalid credentials");
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            user_id: user.user_id,
            email: user.email,
            status: user.status,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d",
        },
    );

    delete user.password_hash;

    return {
        token,
        user,
    };
};

export const getCurrentUser = async (user_id: string) => {
    const result = await query(FIND_USER_BY_ID, [user_id]);

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    const user = result.rows[0];

    delete user.password_hash;

    return user;
};

export const getUsers = async () => {
    const result = await query(GET_ALL_USERS, []);

    return result.rows;
};

export const getUserById = async (user_id: string) => {
    const result = await query(FIND_USER_BY_ID, [user_id]);
    if (result.rows.length === 0) {
        throw new Error("User not found");
    }
    const user = result.rows[0];
    delete user.password_hash;
    return user;
};

export const updateUser = async (
    user_id: string,
    payload: Partial<CreateUserPayload>,) => {
    const existingUserResult = await query(FIND_USER_BY_ID, [user_id]);
    if (existingUserResult.rows.length === 0) {
        throw new Error("User not found");
    }

    const existingUser = existingUserResult.rows[0];
    const updatedData = {
        email: payload.email || existingUser.email,
        first_name: payload.first_name || existingUser.first_name,
        last_name: payload.last_name || existingUser.last_name,
        status: payload.status || existingUser.status,
    };

    const result = await query(UPDATE_USER, [
        updatedData.email,
        updatedData.first_name,
        updatedData.last_name,
        updatedData.status,
        user_id,
    ]);

    const user = result.rows[0];
    delete user.password_hash;
    return user;
};

export const deleteUser = async (user_id: string) => {
    const result = await query(DELETE_USER, [user_id]);
    const user = result.rows[0];

    delete user.password_hash;
    return user;
};
