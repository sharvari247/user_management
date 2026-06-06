import { Request, Response } from "express";
import { registerUser, loginUser, getCurrentUser, getUsers, getUserById, updateUser, deleteUser, } from "./users.services";
import { sendResponse } from "../../utils/response";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await registerUser({
            email: req.body.email,

            password: req.body.password,

            first_name: req.body.first_name,

            last_name: req.body.last_name,
        });

        return sendResponse(res, 201, {
            success: true,

            message: "User created successfully",

            data: user,
        });
    } catch (error: any) {
        return sendResponse(res, 400, {
            success: false,

            message: error.message || "Failed to create user",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const data = await loginUser({
            email: req.body.email,

            password: req.body.password,
        });

        return sendResponse(res, 200, {
            success: true,

            message: "Login successful",

            data,
        });
    } catch (error: any) {
        return sendResponse(res, 400, {
            success: false,

            message: error.message || "Failed to login",
        });
    }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
    try {
        const user = await getCurrentUser({
            user_id: (req as any).user.user_id,
        });

        return sendResponse(res, 200, {
            success: true,

            message: "User fetched successfully",

            data: user,
        });
    } catch (error: any) {
        return sendResponse(res, 404, {
            success: false,

            message: error.message,
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();

        return sendResponse(res, 200, {
            success: true,

            message: "Users fetched successfully",

            data: users,
        });
    } catch (error: any) {
        return sendResponse(res, 404, {
            success: false,

            message: error.message,
        });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const rawUserId = req.params.user_id;
        const userId = typeof rawUserId === "string"
            ? rawUserId
            : Array.isArray(rawUserId)
                ? rawUserId[0]
                : (req as any).user.user_id;

        const user = await getUserById({
            user_id: userId,
        });

        return sendResponse(res, 200, {
            success: true,

            message: "User fetched successfully",

            data: user,
        });
    } catch (error: any) {
        return sendResponse(res, 404, {
            success: false,

            message: error.message,
        });
    }
};

export const updateTheUser = async (req: Request, res: Response) => {
    try {
        const rawUserId = req.params.user_id;
        const userId = typeof rawUserId === "string"
            ? rawUserId
            : Array.isArray(rawUserId)
                ? rawUserId[0]
                : (req as any).user.user_id;

        const updatedUser = await updateUser({
            user_id: userId,

            payload: req.body,
        });

        return sendResponse(res, 200, {
            success: true,

            message: "User updated successfully",

            data: updatedUser,
        });
    } catch (error: any) {
        return sendResponse(res, 400, {
            success: false,

            message: error.message || "Failed to update user",
        });
    }
};

export const deleteTheUser = async (req: Request, res: Response) => {
    try {
        const rawUserId = req.params.user_id;
        const userId = typeof rawUserId === "string"
            ? rawUserId
            : Array.isArray(rawUserId)
                ? rawUserId[0]
                : (req as any).user.user_id;

        const deletedUser = await deleteUser({
            user_id: userId,
        });

        return sendResponse(res, 200, {
            success: true,

            message: "User deleted successfully",

            data: deletedUser,
        });
    } catch (error: any) {
        return sendResponse(res, 400, {
            success: false,

            message: error.message || "Failed to delete user",
        });
    }
};
