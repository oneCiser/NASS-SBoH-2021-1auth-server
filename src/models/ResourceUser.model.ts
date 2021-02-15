import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces';
import bycrypt from 'bcrypt';
import { convertToObject } from 'typescript';

const ResourceUserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: {type: String, required:true},
  password: {type: String, required:true},
  type_user:{type:String, required:true},
  maxsize: {type:Number,required:true},
  directory: {type:[],required:false},
  share_out: {type:[],required:false},
  share_in: {type:[],required:false}
});
/**
 * @description genera un hash de el password cuando se crea el usuario o se actualiza la clave
 */
ResourceUserSchema.pre('save', async function (next) {
  const saltRound = process.env.SALT_ROUND || 10
  let user = <IUser>this
  if (this.isModified('password')){
    let hash =  await bycrypt.hash(user.password, saltRound)
    user.password = hash
    return next()
  }
  return next()
  
})
/**
 * 
 * @param {string} password
 * @description compare the hash password of database with the password from client
 * @returns {Promise} true if the passwords are the same
 */
ResourceUserSchema.methods.isValidPassword = async function(password: string) {
  const user = this
  const compare = await bycrypt.compare(password,user.password)
  return compare;
}

const ResourceUser: Model<IUser> = mongoose.model('ResourceUser', ResourceUserSchema);
export default ResourceUser;
