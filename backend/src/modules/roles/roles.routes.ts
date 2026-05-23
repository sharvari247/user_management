import { Router } from "express";
import validate from "../../middleware/validate";
import auth from "../../middleware/auth";

import { createNewRole, getAllRoles, assignUserRole, getRolesOfUser, } from "./roles.controller";
import { createRoleSchema, assignRoleSchema, } from "./roles.schema";

const router = Router();

router.post("/", auth, validate(createRoleSchema), createNewRole);
router.get("/", auth, getAllRoles);
router.post("/assign/", auth, validate(assignRoleSchema), assignUserRole);
router.get("/user/:user_id", auth, getRolesOfUser);

export default router;