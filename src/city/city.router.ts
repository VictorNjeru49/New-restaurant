import { Hono } from "hono";
import { getcity, getcityController, createcityController, updatecityController, deletecityController } from "./city.controller";
import { zValidator } from "@hono/zod-validator";
import { cityValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const cityRouter = new Hono();

cityRouter.get("/city", getcity);

// get all city
cityRouter
    .get("city", adminRoleAuth ,getcityController)
    .post("city",  zValidator('json', cityValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), createcityController)

// get city by id
cityRouter
    .get("/city/:id", bothRoleAuth, getcityController)
    .put("/city/:id", updatecityController)
    .delete("/city/:id", deletecityController)