import bcrypt from 'bcryptjs'

export default class PasswordSerive{
    static async validate(pass: string, hash: string){
        const result = await bcrypt.compare(pass, hash);
        return result;
    }

    static async hash(pass: string){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        return hashedPassword;
    }
}