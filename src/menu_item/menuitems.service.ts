import { eq } from "drizzle-orm";
import db from '../drizzle/db';
import { menu_itemtable, TImenuitems } from '../drizzle/schema';


const menuitemsService = async (limit?: number)=> {
    if (limit) {
        return await db.query.menu_itemtable.findMany({
            limit: limit,
        });
    }
    return await db.query.menu_itemtable.findMany();
}

const getmenuitemsService = async (id: number)=> {
    return await db.query.menu_itemtable.findFirst({
        where: eq(menu_itemtable.id, id)
    })
}

const createmenuitemsService = async (user: TImenuitems) => {
    await db.insert(menu_itemtable).values(user)
    return "User created successfully";
}

const updatemenuitemsService = async (id: number, user: TImenuitems) => {
    await db.update(menu_itemtable).set(user).where(eq(menu_itemtable.id, id))
    return "User updated successfully";
}

const deletemenuitemsService = async (id: number) => {
    await db.delete(menu_itemtable).where(eq(menu_itemtable.id, id))
    return "User deleted successfully";
}

export{
    menuitemsService,
    getmenuitemsService,
    createmenuitemsService,
    updatemenuitemsService,
    deletemenuitemsService
}