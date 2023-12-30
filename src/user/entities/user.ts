import { Meet } from 'meet/entities';
import { Column, DataType, Default, HasMany, Model, NotNull, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUID)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @NotNull
  @Column({
    field: 'first_name',
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @NotNull
  @Column({
    field: 'last_name',
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @NotNull
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @NotNull
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;

  @HasMany(() => Meet)
  meets: Meet[];
}
