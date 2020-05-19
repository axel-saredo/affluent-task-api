import dotenv from 'dotenv';
import { Service } from 'typedi';
import { Request, Response } from 'express';
import axios from 'axios';

import { User } from '../repositories/user.repository';
import UsersService from '../services/users.service';

dotenv.config();

const URL_PAGE_1 = process.env.URL_PAGE_1!; 
const URL_PAGE_2 = process.env.URL_PAGE_2!; 

let USERS: User[];

@Service()
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  public async fetchUsers(req: Request, res: Response) {
    try {
      const responseFirstPage = await axios.get(URL_PAGE_1);
      const responseSecondPage = await axios.get(URL_PAGE_2);

      const usersFromFirstPage: User[] = responseFirstPage.data.data;
      const usersFromSecondPage: User[] = responseSecondPage.data.data;

      const users: User[] = usersFromFirstPage.concat(usersFromSecondPage);
      USERS = users;

      await this.usersService.saveUsers(USERS);

      res.json({ users: USERS }); 
    } catch (error) {
      console.error(error);
    }
  }
}