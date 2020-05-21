import { Service } from 'typedi';

import { UserRepository, User } from '../../repositories/user.repository';

@Service()
export default class UsersService {
    constructor() {}

    async saveUsers(usersData: User[])  {
        const dataAlreadyExists = !!await UserRepository.findOne({ where: { id: '1' } });

        if(!dataAlreadyExists) {
            return await UserRepository.bulkCreate(usersData, {
                updateOnDuplicate: ['id']
            }); 
        } else {
            return;
        }
    }
}