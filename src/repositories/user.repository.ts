import { Column, Model, PrimaryKey, Table, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: true,
})
export class UserRepository extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id?: number;

    @Column
    email: string;

    @Column
    first_name: string;

    @Column
    last_name: string;

    @Column
    avatar: string;
}

export type User = UserRepository;
