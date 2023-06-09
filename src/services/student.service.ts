import { Injectable, NotFoundException } from '@nestjs/common';
import { createStudentDTO } from 'src/dtos/create-student.dto';
import { Student } from 'src/entities/student.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class StudentService {
  mockStudents: Student[] = [];

  constructor(
    private entityManager: EntityManager, // private readonly enrollmentService: EnrollmentService,
  ) {}

  async getAllStudents(): Promise<Student[]> {
    return await this.entityManager.query(`
      SELECT *
      FROM students
    `);
  }

  async getStudentCount(): Promise<number> {
    const result = await this.entityManager.query(
      `
      SELECT COUNT(*) as count
      FROM students
    `,
    );
    return result[0].count;
  }

  async getStudentByID(studentID: string): Promise<Student> {
    return await this.entityManager.query(
      `
      SELECT *
      FROM students
      WHERE studentID = ?
    `,
      [studentID],
    );
  }

  async getStudentsByName(studentName: string): Promise<Student[]> {
    return await this.entityManager.query(
      `
      SELECT *
      FROM students
      WHERE studentName = ?
    `,
      [studentName],
    );
  }

  async createStudent(student: createStudentDTO): Promise<Student> {
    const studentID = await this.generateStudentID();
    const password = await this.generatePassword();
    const email = await this.generateEmail(student.studentName, studentID);

    const newStudent: Student = {
      studentID,
      email,
      password,
      ...student,
    };

    await this.entityManager.query(
      `
      INSERT INTO students (studentID, email, password, studentName, major, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        newStudent.studentID,
        newStudent.email,
        newStudent.password,
        newStudent.studentName,
        newStudent.major,
        newStudent.role,
      ],
    );

    return newStudent;
  }

  async updateStudent(student: Student): Promise<Student> {
    const result = await this.entityManager.query(
      `
      UPDATE students
      SET studentName = ?, major = ?
      WHERE studentID = ?
    `,
      [student.studentName, student.major, student.studentID],
    );

    if (result.affected === 0) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async deleteStudent(studentID: string): Promise<void> {
    await this.deleteEnrollmentsByStudentID(studentID);
    return await this.entityManager.query(
      `
      DELETE FROM students
      WHERE studentID = ?
    `,
      [studentID],
    );
  }

  async deleteEnrollmentsByStudentID(studentID: string): Promise<void> {
    const result = await this.entityManager.query(
      `
      DELETE FROM enrollments
      WHERE studentID = ?
    `,
      [studentID],
    );

    if (result.affected === 0) {
      throw new NotFoundException('Enrollment not found');
    }
  }

  private async generateStudentID(): Promise<string> {
    return 'U' + Math.floor(Math.random() * 100000000);
  }

  private async generatePassword(): Promise<string> {
    const password = Math.random().toString(36).slice(-8);
    return password;
  }

  private async generateEmail(
    studentName: string,
    studentID: string,
  ): Promise<string> {
    const formattedName = studentName.toLowerCase().split(' ').join('');
    const email = `${formattedName}.${studentID}@usf.edu`;
    return email;
  }
}
