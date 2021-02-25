import { Document } from 'mongoose';

/**
 * Define a interface of resource to managament with mongoose
 * @category Interfaces
 * @interface IToken
 * @extends {Document}
 */
interface IToken extends Document{
    email: String,
    hashKey: String,
    createdAt: Date,
    isValidToken: Function
}
export default IToken;
