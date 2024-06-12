import { Hono } from "hono";
import { getcategory, getcategoryController, createcategoryController, updatecategoryController, deletecategoryController} from "./categories.controller";
import { zValidator } from "@hono/zod-validator";
import { categoryValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const categoriesRouter = new Hono();

categoriesRouter.get("/categories", getcategory);

// get all category table
categoriesRouter
    .get("/categories", adminRoleAuth, getcategoryController)
    .post("/categories", zValidator('json', categoryValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), createcategoryController)

// get category table by id
categoriesRouter
    .get("/categories/:id", bothRoleAuth, getcategoryController)
    .put("/categories/:id", updatecategoryController)
    .delete("/categories/:id", deletecategoryController)