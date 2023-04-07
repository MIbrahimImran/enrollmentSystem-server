import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/entities/enrollment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentService {
  mockEnrollments: Enrollment[] = [
    {
      studentID: 'U02463323',
      studentName: 'John Doe',
      courseID: 'CSC 436',
      title: 'Software Engineering',
      enrollmentID: 1,
    },
    {
      studentID: 'U02463323',
      studentName: 'Jane Doe',
      courseID: 'CSC 437',
      title: 'Software Testing',
      enrollmentID: 2,
    },
    {
      studentID: 'U02463323',
      studentName: 'John Smith',
      courseID: 'CSC 438',
      title: 'Software Project Management',
      enrollmentID: 3,
    },
  ];

  constructor() {}

  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.mockEnrollments;
  }

  async getEnrollmentByID(enrollmentID: number): Promise<Enrollment> {
    return this.mockEnrollments.find(
      (enrollment) => enrollment.enrollmentID === enrollmentID,
    );
  }

  async getEnrollmentsByStudent(studentName: string): Promise<Enrollment[]> {
    return this.mockEnrollments.filter(
      (enrollment) => enrollment.studentName === studentName,
    );
  }

  async getEnrollmentsByCourseID(courseID: string): Promise<Enrollment[]> {
    return this.mockEnrollments.filter(
      (enrollment) => enrollment.courseID === courseID,
    );
  }

  async createEnrollment(enrollment: Enrollment): Promise<Enrollment> {
    this.mockEnrollments.push(enrollment);
    return enrollment;
  }

  async deleteEnrollment(enrollmentID: number): Promise<void> {
    this.mockEnrollments = this.mockEnrollments.filter(
      (enrollment) => enrollment.enrollmentID !== enrollmentID,
    );
  }
}
