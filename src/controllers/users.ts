import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import axios from 'axios';

import { User } from '../models/user';

dotenv.config();

const URL = process.env.URL!; 

let USERS: User[];

export const fetchUsers: RequestHandler = async (req, res, next) => {
    try {
        const response = await axios.get(URL);
        const users: User[] = response.data.data;
        USERS = users;
        res.json({ users: USERS }); 
      } catch (error) {
        console.error(error);
    }
}