import mongoose, { Model, Schema } from 'mongoose';
import { IToken } from '../interfaces';
import {tokenType} from '../utils'
import '../config/dotenv';
import bycrypt from 'bcrypt';

const TokenSchema: Schema<IToken> = new Schema({
  email: {type: String, required:true, unique: true},
  hashKey: {type:String},
  createdAt: { type: Date,  default: Date.now }
});
/**
 * @description index with time to live, after one hour de document will be remove
 */
TokenSchema.index({createdAt: 1},{expireAfterSeconds: 3600});

/**
 * @description compare the hash with email and date of restore token
 * @param {string} email - email of user
 * @param {Date} iat - date of restore token
 */
TokenSchema.methods.isValidToken = async function (email:string, iat:Date) {
  const token = this;
  console.log(iat);

  const compare = await bycrypt.compare(email+'-'+iat,this.hashKey);
  return compare;
}

const Token: Model<IToken> = mongoose.model('Token', TokenSchema);
export default Token;
