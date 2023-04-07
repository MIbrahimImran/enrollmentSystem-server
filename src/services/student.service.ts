import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  mockStudents: Student[] = [
    {
      studentID: 'U02463323',
      studentName: 'John Doe',
      major: 'Computer Science',
      email: 'example@example.com',
      password: 'abc123@',
    },
    {
      studentID: 'U02463323',
      studentName: 'Jane Doe',
      major: 'Computer Science',
      email: 'example@example.com',
      password: 'abc123@',
    },
  ];
  constructor() {}

  async getAllStudents(): Promise<Student[]> {
    return this.mockStudents;
  }

  async getStudentByID(studentID: string): Promise<Student> {
    return this.mockStudents.find((student) => student.studentID === studentID);
  }

  async getStudentByName(studentName: string): Promise<Student> {
    return this.mockStudents.find(
      (student) => student.studentName === studentName,
    );
  }

  async createStudent(student: Student): Promise<Student> {
    this.mockStudents.push(student);
    return student;
  }

  async deleteStudent(studentID: string): Promise<void> {
    this.mockStudents = this.mockStudents.filter(
      (student) => student.studentID !== studentID,
    );
  }
}
