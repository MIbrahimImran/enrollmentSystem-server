import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDTO } from 'src/controllers/dtos/create-enrollment.dto';
import { Enrollment } from 'src/entities/enrollment.entity';
import { StudentService } from './student.service';
import { CourseService } from './course.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EnrollmentService {
  mockEnrollments: Enrollment[] = [];

  constructor(
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
  ) {}

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

  async createEnrollment(enrollment: CreateEnrollmentDTO): Promise<Enrollment> {
    const isStudentEnrolled = await this.isStudentEnrolled(
      enrollment.studentID,
      enrollment.courseID,
    );

    if (isStudentEnrolled) throw new NotFoundException('Student is enrolled');

    const student = await this.studentService.getStudentByID(
      enrollment.studentID,
    );
    if (!student) throw new NotFoundException('Student not found');

    const course = await this.courseService.getCourseByID(enrollment.courseID);
    if (!course) throw new NotFoundException('Course not found');

    const newEnrollment: Enrollment = {
      enrollmentID: this.mockEnrollments.length + 1,
      studentID: enrollment.studentID,
      studentName: student.studentName,
      courseID: enrollment.courseID,
      courseTitle: course.title,
    };

    this.mockEnrollments.push(newEnrollment);

    return newEnrollment;
  }

  async deleteEnrollment(enrollmentID: number): Promise<void> {
    this.mockEnrollments = this.mockEnrollments.filter(
      (enrollment) => enrollment.enrollmentID !== enrollmentID,
    );
  }

  private async isStudentEnrolled(
    studentID: string,
    courseID: string,
  ): Promise<boolean> {
    return this.mockEnrollments.some(
      (enrollment) =>
        enrollment.studentID === studentID && enrollment.courseID === courseID,
    );
  }
}
