import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('course')
export class Course {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  courseID: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  instructor: string;

  @Column({ type: 'int' })
  credits: number;
}
