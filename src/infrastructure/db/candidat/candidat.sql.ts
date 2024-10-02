import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "candidats",
})
export default class CandidatSQL extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "langage"
  })
  langage?: string;

  @Column({
    type: DataType.STRING(255),
    field: "email"
  })
  email?: string;

  @Column({
    type: DataType.INTEGER,
    field: "xp"
  })
  xp?: number;
}
