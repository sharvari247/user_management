import { Request, Response } from "express";
import { createRole, getRoles, assignRole, getUserRoles, } from "./roles.services";
import { sendResponse } from "../../utils/response";

export const createNewRole = async (req: Request, res: Response) => {
    try {
        const role = await createRole({
            role_name: req.body.role_name,

            description: req.body.description,

            hierarchy_level: req.body.hierarchy_level,
        });

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
        const data = await assignRole({
            user_id: req.body.user_id,

            role_id: req.body.role_id,
        });

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
        const rawUserId = req.params.user_id;
        const userId = typeof rawUserId === "string"
            ? rawUserId
            : Array.isArray(rawUserId)
                ? rawUserId[0]
                : (req as any).user.user_id;

        const roles = await getUserRoles({
            user_id: userId,
        });

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
