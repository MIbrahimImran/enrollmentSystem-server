import { Injectable } from '@nestjs/common';
import { createStudentDTO } from 'src/controllers/dtos/create-student.dto';
import { Student } from 'src/entities/student.entity';

@Injectable()
export class StudentService {
  mockStudents: Student[] = [];

  async getAllStudents(): Promise<Student[]> {
    return this.mockStudents;
  }

  async getStudentByID(studentID: string): Promise<Student> {
    return this.mockStudents.find((student) => student.studentID === studentID);
  }

  async getStudentsByName(studentName: string): Promise<Student[]> {
    return this.mockStudents.filter((student) =>
      student.studentName.includes(studentName),
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
    this.mockStudents.push(newStudent);
    return newStudent;
  }

  async deleteStudent(studentID: string): Promise<void> {
    this.mockStudents = this.mockStudents.filter(
      (student) => student.studentID !== studentID,
    );
  }

  private async generateStudentID(): Promise<string> {
    while (true) {
      const studentID = 'U' + Math.floor(Math.random() * 100000000);
      if (
        !this.mockStudents.find((student) => student.studentID === studentID)
      ) {
        return studentID;
      }
    }
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
