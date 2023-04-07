import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  enrollmentID: number;

  @Column({ type: 'varchar', length: 255 })
  studentID: string;

  @Column({ type: 'varchar', length: 255 })
  courseID: string;
}
