import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Noticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imgUrl: string;

  @Column()
  url: string;
}
