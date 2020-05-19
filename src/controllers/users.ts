import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import axios from 'axios';

import { User } from '../models/user';

dotenv.config();

const URL_PAGE_1 = process.env.URL_PAGE_1!; 
const URL_PAGE_2 = process.env.URL_PAGE_2!; 

let USERS: User[];

export const fetchUsers: RequestHandler = async (req, res, next) => {
    try {
        const responseFirstPage = await axios.get(URL_PAGE_1);
        const responseSecondPage = await axios.get(URL_PAGE_2);

        const usersFromFirstPage = responseFirstPage.data.data;
        const usersFromSecondPage = responseSecondPage.data.data;

        const users: User[] = usersFromFirstPage.concat(usersFromSecondPage);
        USERS = users;

        res.json({ users: USERS }); 
      } catch (error) {
        console.error(error);
    }
}