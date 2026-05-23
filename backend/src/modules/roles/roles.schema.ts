import * as z from "zod";

export const createRoleSchema = z.object({
    role_name: z.string().min(2),
    description: z.string().optional(),
    hierarchy_level: z.number().min(1),
});

export const assignRoleSchema = z.object({
    user_id: z.string().uuid(),
    role_id: z.string().uuid()
});
