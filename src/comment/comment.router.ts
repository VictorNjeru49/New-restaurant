import { Hono } from "hono";
import { getcomment, getcommentController, createcommentController, updatecommentController, deletecommentController} from "./comment.controller";
import { zValidator } from "@hono/zod-validator";
import { commentValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const commentRouter = new Hono();

commentRouter.get("/comment", getcomment);

// get all comment
commentRouter
    .get("comment", adminRoleAuth, getcommentController)
    .post("comment", zValidator('json', commentValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), createcommentController,)

// get comment by id
commentRouter
    .get("/comment/:id", bothRoleAuth, getcommentController)
    .put("/comment/:id", updatecommentController)
    .delete("/comment/:id", deletecommentController)