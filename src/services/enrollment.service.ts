import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateEnrollmentDTO } from 'src/dtos/create-enrollment.dto';
import { EnrollmentDTO } from 'src/dtos/enrollment-dto';
import { CourseService } from './course.service';
import { StudentService } from './student.service';

@Injectable()
export class EnrollmentService {
  constructor(
    private entityManager: EntityManager,
    private readonly courseService: CourseService,
    private readonly studentService: StudentService,
  ) {}

  async getAllEnrollments(): Promise<EnrollmentDTO[]> {
    return await this.entityManager.query(`
      SELECT e.enrollmentID,
             s.studentID,
             s.studentName,
             s.email as studentEmail,
             c.courseID,
             c.title as courseTitle,
             c.instructor as courseInstructor,
             c.credits as courseCredit
      FROM enrollments e
      JOIN students s ON e.studentID = s.studentID
      JOIN courses c ON e.courseID = c.courseID
    `);
  }

  async getEnrollmentByID(enrollmentID: number): Promise<EnrollmentDTO> {
    const result = await this.entityManager.query(
      `
      SELECT e.enrollmentID,
             s.studentID,
             s.studentName,
             s.email as studentEmail,
             c.courseID,
             c.title as courseTitle,
             c.instructor as courseInstructor,
             c.credits as courseCredit
      FROM enrollments e
      JOIN students s ON e.studentID = s.studentID
      JOIN courses c ON e.courseID = c.courseID
      WHERE e.enrollmentID = ?
    `,
      [enrollmentID],
    );
    return result[0];
  }

  async getEnrollmentsByStudent(studentName: string): Promise<EnrollmentDTO[]> {
    return await this.entityManager.query(
      `
      SELECT e.enrollmentID,
             s.studentID,
             s.studentName,
             s.email as studentEmail,
             c.courseID,
             c.title as courseTitle,
             c.instructor as courseInstructor,
             c.credits as courseCredit
      FROM enrollments e
      JOIN students s ON e.studentID = s.studentID
      JOIN courses c ON e.courseID = c.courseID
      WHERE s.studentName = ?
    `,
      [studentName],
    );
  }

  async getEnrollmentsByStudentID(studentID: string): Promise<EnrollmentDTO[]> {
    return await this.entityManager.query(
      `
      SELECT e.enrollmentID,
              s.studentID,
              s.studentName,
              s.email as studentEmail,
              c.courseID,
              c.title as courseTitle,
              c.instructor as courseInstructor,
              c.credits as courseCredit
      FROM enrollments e
      JOIN students s ON e.studentID = s.studentID
      JOIN courses c ON e.courseID = c.courseID
      WHERE s.studentID = ?
    `,
      [studentID],
    );
  }

  async getEnrollmentsByCourseID(courseID: string): Promise<EnrollmentDTO[]> {
    return await this.entityManager.query(
      `
      SELECT e.enrollmentID,
             s.studentID,
             s.studentName,
             s.email as studentEmail,
             c.courseID,
             c.title as courseTitle,
             c.instructor as courseInstructor,
             c.credits as courseCredit
      FROM enrollments e
      JOIN students s ON e.studentID = s.studentID
      JOIN courses c ON e.courseID = c.courseID
      WHERE c.courseID = ?
    `,
      [courseID],
    );
  }

  async createEnrollment(
    enrollment: CreateEnrollmentDTO,
  ): Promise<EnrollmentDTO> {
    const isStudentEnrolled = await this.isStudentEnrolled(
      enrollment.studentID,
      enrollment.courseID,
    );

    if (isStudentEnrolled)
      throw new NotFoundException('Student is already enrolled');

    const student = await this.studentService.getStudentByID(
      enrollment.studentID,
    );

    if (!student) throw new NotFoundException('Student not found');

    const course = await this.courseService.getCourseByID(enrollment.courseID);
    if (!course) throw new NotFoundException('Course not found');

    const response = await this.entityManager.query(
      `
      INSERT INTO enrollments (studentID, courseID)
      VALUES (?, ?)
    `,
      [enrollment.studentID, enrollment.courseID],
    );

    return await this.getEnrollmentByID(response.insertId);
  }

  async isStudentEnrolled(
    studentID: string,
    courseID: string,
  ): Promise<boolean> {
    const result = await this.entityManager.query(
      `
      SELECT * FROM enrollments
      WHERE studentID = ? AND courseID = ?
    `,
      [studentID, courseID],
    );

    return result.length > 0;
  }

  async deleteEnrollment(enrollmentID: number): Promise<void> {
    const result = await this.entityManager.query(
      `
      DELETE FROM enrollments
      WHERE enrollmentID = ?
    `,
      [enrollmentID],
    );

    if (result.affected === 0) {
      throw new NotFoundException('Enrollment not found');
    }
  }
}
