import { Hono } from "hono";
import { getorderMenu, getorderMenuController, createorderMenuController, updateorderMenuController, deleteorderMenuController } from "./ordermenuitem.controller";
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";



export const orderMenuRouter = new Hono();

orderMenuRouter.get("/order_menu_item", getorderMenu);

// get all order Menu
orderMenuRouter
    .get("order_menu_item", adminRoleAuth, getorderMenuController)
    .post("order_menu_item", zValidator('json', orderMenuItemValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), createorderMenuController)

// get order Menu by id
orderMenuRouter
    .get("/order_menu_item/:id", bothRoleAuth, getorderMenuController)
    .put("/order_menu_item/:id", updateorderMenuController)
    .delete("/order_menu_item/:id", deleteorderMenuController)