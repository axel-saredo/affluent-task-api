import { Service } from 'typedi';
import { UserRepository, User } from '../repositories/user.repository';

@Service()
export default class UsersService {
    constructor() {}

    saveUsers(usersData: User[])  {
        return UserRepository.bulkCreate(usersData, {
            updateOnDuplicate: ['id']
        });
    } 
}