import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { restauranttable, TIresturant } from '../drizzle/schema';


const restaurantService = async (limit?: number)=> {
    if (limit) {
        return await db.query.restauranttable.findMany({
            limit: limit,
        });
    }
    return await db.query.restauranttable.findMany();
}

const getrestaurantService = async (id: number)=> {
    return await db.query.restauranttable.findFirst({
        where: eq(restauranttable.id, id)
    })
}

const createrestaurantService = async (user: TIresturant) => {
    await db.insert(restauranttable).values(user)
    return "User created successfully";
}

const updaterestaurantService = async (id: number, user: TIresturant) => {
    await db.update(restauranttable).set(user).where(eq(restauranttable.id, id))
    return "User updated successfully";
}

const deleterestaurantService = async (id: number) => {
    await db.delete(restauranttable).where(eq(restauranttable.id, id))
    return "User deleted successfully";
}

export{
    restaurantService,
    getrestaurantService,
    createrestaurantService,
    updaterestaurantService,
    deleterestaurantService
}