import { Document } from 'mongoose';

/**
 * the structure of token
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
