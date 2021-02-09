import { Document } from 'mongoose';

/**
 * Define a interface of resource to managament with mongoose
 * @category Interfaces
 * @interface IUser
 * @extends {Document}
 */
interface IUser extends Document{
    user: String,
    password: String,
    type_user: String,
    maxsize: Number,
    directory: {type:[],required:false},
    share_out: {type:[],required:false},
    share_in: {type:[],required:false}
}
export default IUser;
