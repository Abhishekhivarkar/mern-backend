// import type {Request,Response,NextFunction} from "express"
// import {config} from "../../configs/env.config.js"
// import UserModel from "../../modules/auth/models/User.model.js"
// import jwt from "jsonwebtoken"
// import {verifyAccessToken} from "../helpers/token.helper.js"
// import {HTTP_STATUS} from "../constants/httpStatus.constant.js"
// import {MESSAGES} from "../constants/messages.constant.js"
// import BlackListLokenModel from "../../modules/auth/models/BlackListToken.model.js"

// export const authMiddleware =async (req:Request,res:Response,next:NextFunction) =>{
//  try{
//  const token = req.headers.authorization?.split(" ")[1]

//  if(!token){
//   return res.status(HTTP_STATUS.FORBIDDEN).json({
//    success:false,
//    message:MESSAGES.AUTH.FORBIDDEN
//   })
//  }

//  const blackListToken = await BlackListLokenModel.findOne({
//     token:token
//  })

//  if(blackListToken){
//     return res.status(401).json({
//         success:false,
//         message:"Invliad or expired token"
//     })
//  }

//  const decoded = verifyAccessToken(token)

//  const user = await UserModel.findById(decoded.id)

//  if(!user){
//   return res.status(HTTP_STATUS.FORBIDDEN).json({
//    success:false,
//    message:MESSAGES.AUTH.FORBIDDEN
//   })
//  }

//  req.userId = decoded.id
//  next()
//  }catch(err){
//   console.log("Auth middleware error : ",err)
//  }
// }

import type { RequestHandler } from "express";
import { MESSAGES } from "../constants/messages.constant.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";

import { verifyAccessToken } from "../helpers/token.helper.js";

import { pool } from "../../configs/db.config.js";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: MESSAGES.AUTH.FORBIDDEN,
      });

      return;
    }

    const blackListToken = await pool.query(
      `
    SELECT access_token FROM black_list_token WHERE access_token = $1 LIMIT 1
    `,
      [token],
    );

    if (blackListToken) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token, black listed token",
      });

      return;
    }

    const decoded = verifyAccessToken(token);

    const user = await pool.query(
      `
    SELECT * FROM users where user_id = $1
    `,
      [decoded.id],
    );

    if (!user) {
      res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: MESSAGES.AUTH.FORBIDDEN,
      });

      return;
    }

    req.userId = decoded.id;

    next();
  } catch (err) {
    next(err);
  }
};
