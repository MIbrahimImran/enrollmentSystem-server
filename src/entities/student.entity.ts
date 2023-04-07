import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  studentID: string;

  @Column({ type: 'varchar', length: 255 })
  studentName: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  major: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}
