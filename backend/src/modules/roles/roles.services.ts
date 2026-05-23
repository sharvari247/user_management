import { query } from "../../utils/query";

import {
    INSERT_ROLE,
    FIND_ROLE_BY_NAME,
    GET_ALL_ROLES,
    ASSIGN_ROLE_TO_USER,
    GET_USER_ROLES,
} from "./roles.queries";


export const createRole = async (payload: any) => {
    const { role_name, description, hierarchy_level } = payload;
    const existingRole = await query(FIND_ROLE_BY_NAME, [role_name]);

    if (existingRole.rows.length > 0) {
        throw new Error("Role already exists");
    }

    const result = await query(INSERT_ROLE, [
        role_name,
        description,
        hierarchy_level,
    ]);

    return result.rows[0];
};


export const getRoles = async () => {
    const result = await query(GET_ALL_ROLES);
    return result.rows;
};


export const assignRole = async (user_id: string, role_id: string) => {
    const result = await query(ASSIGN_ROLE_TO_USER, [user_id, role_id]);
    return result.rows[0];
};


export const getUserRoles = async (user_id: string) => {
    const result = await query(GET_USER_ROLES, [user_id]);
    return result.rows;
};
