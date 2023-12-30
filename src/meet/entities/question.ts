import { Column, DataType, Default, ForeignKey, Model, NotNull, PrimaryKey, Table } from 'sequelize-typescript';

import { Meet } from '.';

@Table
export class Question extends Model {
  @PrimaryKey
  @Default(DataType.UUID)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Meet)
  @NotNull
  @Column({
    field: 'meet_id',
    type: DataType.STRING,
    allowNull: false,
  })
  meetId: string;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  question: string;

  @NotNull
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;
}
