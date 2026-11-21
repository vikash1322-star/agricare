import express from 'express';import User from '../models/User.js';import ServiceRequest from '../models/ServiceRequest.js';import {auth,adminOnly}from '../middleware/auth.js';
const router=express.Router();router.use(auth,adminOnly);
router.get('/summary',async(req,res)=>{const [users,total,pending,approved,rejected]=await Promise.all([User.countDocuments({role:'customer'}),ServiceRequest.countDocuments(),ServiceRequest.countDocuments({status:'Pending'}),ServiceRequest.countDocuments({status:'Approved'}),ServiceRequest.countDocuments({status:'Rejected'})]);res.json({users,total,pending,approved,rejected});});
router.get('/users',async(req,res)=>{const users=await User.find({role:'customer'}).select('-password').sort({createdAt:-1});res.json({users});});
export default router;
