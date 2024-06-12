import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { orderstable, TIorder } from '../drizzle/schema';


const ordersService = async (limit?: number)=> {
    if (limit) {
        return await db.query.orderstable.findMany({
            limit: limit,
        });
    }
    return await db.query.orderstable.findMany();
}

const getordersService = async (id: number)=> {
    return await db.query.orderstable.findFirst({
        where: eq(orderstable.id, id)
    })
}

const createordersService = async (user: TIorder) => {
    await db.insert(orderstable).values(user)
    return "User created successfully";
}

const updateordersService = async (id: number, user: TIorder) => {
    await db.update(orderstable).set(user).where(eq(orderstable.id, id))
    return "User updated successfully";
}

const deleteordersService = async (id: number) => {
    await db.delete(orderstable).where(eq(orderstable.id, id))
    return "User deleted successfully";
}

export{
    ordersService,
    getordersService,
    createordersService,
    updateordersService,
    deleteordersService
}