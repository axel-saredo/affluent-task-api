import { Column, Model, PrimaryKey, Table, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'date',
  timestamps: true,
})
export class DateRepository extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id?: number;

    @Column
    date: string;

    @Column
    commissionsTotal: string;

    @Column
    salesNet: string;

    @Column
    clicks: string;

    @Column
    epc: string;

    @Column
    impressions: string;

    @Column
    cr: string;
}

export type DateModel = DateRepository;
