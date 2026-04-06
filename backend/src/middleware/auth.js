import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const protect = async (req,res,next)=>{
  const token = (req.headers.authorization || '').replace('Bearer ','');
  if(!token) return res.status(401).json({message:'Unauthorized'});
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

export const adminOnly = (req,res,next)=> req.user?.role === 'admin' ? next() : res.status(403).json({message:'Admin only'});
