import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'nest_js_tag',
})
export class Tag extends Model<Tag> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
  createdAt: number;
  
  @Column
  tagname: string;
}