import { User } from '../models/user';
import axios from 'axios';

const URL = 'https://reqres.in/api/users?page=2'; 

export async function getUsers(): Promise<User[] | undefined> {
    try {
      const response = await axios.get(URL);
      const users: User[] = response.data.data;
      return users;
    } catch (error) {
      console.error(error);
    }
}