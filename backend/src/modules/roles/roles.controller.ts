import { Request, Response } from "express";
import { createRole, getRoles, assignRole, getUserRoles, } from "./roles.services";
import { sendResponse } from "../../utils/response";

export const createNewRole = async (req: Request, res: Response) => {
    try {
        const role = await createRole(req.body);

        return sendResponse(res, 201, {
            success: true,
            message: "Role created successfully",
            data: role,
        });
    } catch (error: any) {
        return sendResponse(res, 400, {
            success: false,
            message: error.message,
        });
    }
};

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await getRoles();
        return sendResponse(res, 200, {
            success: true,
            message: "Roles fetched successfully",
            data: roles,
        });
    } catch (error: any) {
        return sendResponse(res, 500, {
            success: false,
            message: error.message,
        });
    }
};

export const assignUserRole = async (req: Request, res: Response) => {
    try {
        const { user_id, role_id } = req.body;
        const data = await assignRole(user_id, role_id);

        return sendResponse(res, 200, {
            success: true,
            message: "Role assigned successfully",
            data,
        });
    } catch (error: any) {
        return sendResponse(res, 400, {
            success: false,
            message: error.message,
        });
    }
};

export const getRolesOfUser = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const roles = await getUserRoles(user_id as string);
        return sendResponse(res, 200, {
            success: true,
            message: "User roles fetched successfully",
            data: roles,
        });
    } catch (error: any) {
        return sendResponse(res, 500, {
            success: false,
            message: error.message,
        });
    }
};
