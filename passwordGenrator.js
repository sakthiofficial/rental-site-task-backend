import { genSalt } from "bcrypt";
import bcrypt from "bcrypt"

export async function passwordGenarator(password) {
    const Salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, Salt)

    return hasedPassword
}