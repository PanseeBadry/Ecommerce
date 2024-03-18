import express from 'express'
import { signIn, signUp } from './auth.controller.js'


export const authRoutes = express.Router()

authRoutes.post("/signUp",signUp)
authRoutes.post("/signIn",signIn)