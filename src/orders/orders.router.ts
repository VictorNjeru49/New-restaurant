import { Hono } from "hono";
import { getorders, getordersController, createordersController, updateordersController, deleteordersController } from "./orders.controller";
import { zValidator } from "@hono/zod-validator";
import { ordersValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const ordersRouter = new Hono();

ordersRouter.get("/orders", getorders);

// get all orders
ordersRouter
    .get("orders", adminRoleAuth, getordersController)
    .post("orders", zValidator('json', ordersValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), createordersController)

// get orders by id
ordersRouter
    .get("/orders/:id",bothRoleAuth, getordersController)
    .put("/orders/:id", updateordersController)
    .delete("/orders/:id", deleteordersController)