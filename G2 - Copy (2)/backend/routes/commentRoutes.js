import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { Comment } from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authenticateToken from "../middleware/authenticateToken.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
