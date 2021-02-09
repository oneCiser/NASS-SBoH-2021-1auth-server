import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces';
import bycrypt from 'bcrypt';
import { convertToObject } from 'typescript';

const ResourceUserSchema: Schema<IUser> = new Schema({
  user: { type: String, required: true },
  password: {type: String, required:true},
  type_user:{type:String, required:true},
  maxsize: {type:Number,required:true},
  directory: {type:[],required:false},
  share_out: {type:[],required:false},
  share_in: {type:[],required:false}
});

ResourceUserSchema.pre('save', async function (next) {
  const saltRound = 10
  let user = <IUser>this
  if (this.isModified('password')){
    let hash =  await bycrypt.hash(user.password, saltRound)
    user.password = hash
    return next()
  }
  return next()
  
})

const ResourceUser: Model<IUser> = mongoose.model('ResourceUser', ResourceUserSchema);
export default ResourceUser;
