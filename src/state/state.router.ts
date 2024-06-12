import { Hono } from "hono";
import { getstate, getstateController, createstateController, updatestateController, deletestateController} from "./state.controller";
import { zValidator } from "@hono/zod-validator";
import { stateValidator } from "../validators";
import { adminRoleAuth, bothRoleAuth} from "../middleware/authormiddle";


export const stateRouter = new Hono();

stateRouter.get("/state", adminRoleAuth, getstate);

// get all state
stateRouter
    .post("state", zValidator('json', stateValidator, (result, c)=>{
        if(!result.success){
            return c.json(result.error, 400)
        }
    }), createstateController)

// get state by id
stateRouter
    .get("/state/:id",bothRoleAuth, getstateController)
    .put("/state/:id", updatestateController)
    .delete("/state/:id", deletestateController)