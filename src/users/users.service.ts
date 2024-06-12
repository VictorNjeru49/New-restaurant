import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { userstable, TIuser } from '../drizzle/schema';


const userService = async (limit?: number)=> {
    if (limit) {
        return await db.query.userstable.findMany({
            limit: limit,
        });
    }
    return await db.query.userstable.findMany();
}

const getuserService = async (id: number)=> {
    return await db.query.userstable.findFirst({
        where: eq(userstable.id, id)
    })
}

const createuserService = async (user: TIuser) => {
    await db.insert(userstable).values(user)
    return "User created successfully";
}

const updateuserService = async (id: number, user: TIuser) => {
    await db.update(userstable).set(user).where(eq(userstable.id, id))
    return "User updated successfully";
}

const deleteuserService = async (id: number) => {
    await db.delete(userstable).where(eq(userstable.id, id))
    return "User deleted successfully";
}

export{
    userService,
    getuserService,
    createuserService,
    updateuserService,
    deleteuserService
}