import { Hono } from "hono";
import { getresturantowner, getresturantownerController, createresturantownerController, updateresturantownerController, deleteresturantownerController } from "./restaurantowner.controller";
import { zValidator } from "@hono/zod-validator";
import { restaurantOwnerValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const resturantownerRouter = new Hono();

resturantownerRouter.get("/restaurant_owner", getresturantowner);

// get all restaurant owners
resturantownerRouter
    .get("restaurant_owner",adminRoleAuth, getresturantownerController)
    .post("restaurant_owner", zValidator('json', restaurantOwnerValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), createresturantownerController)

// get restaurant owner by id
resturantownerRouter
    .get("/restaurant_owner/:id",bothRoleAuth, getresturantownerController)
    .put("/restaurant_owner/:id", updateresturantownerController)
    .delete("/restaurant_owner/:id", deleteresturantownerController)