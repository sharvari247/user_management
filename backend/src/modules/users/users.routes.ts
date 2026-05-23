import { Router } from "express";
import validate from "../../middleware/validate";
import { createUserSchema, loginSchema } from "./user.schema";
import { createUser, getLoggedInUser, login, getAllUsers, getUser, updateTheUser, deleteTheUser } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.post("/login", validate(loginSchema), login);
router.get("/me", auth, getLoggedInUser);
router.get("/all", auth, getAllUsers);
router.get("/user/:user_id", auth, getUser);
router.put("/update/:user_id", auth, updateTheUser);
router.delete("/delete/:user_id", auth, deleteTheUser);

export default router;
