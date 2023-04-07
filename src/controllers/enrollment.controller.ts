import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Enrollment } from 'src/entities/enrollment.entity';
import { EnrollmentService } from 'src/services/enrollment.service';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.enrollmentService.getAllEnrollments();
  }

  @Get('/:enrollmentID')
  async getEnrollmentByID(
    @Param('enrollmentID') enrollmentID: number,
  ): Promise<Enrollment> {
    return this.enrollmentService.getEnrollmentByID(enrollmentID);
  }

  @Get('/student/:studentName')
  async getEnrollmentsByStudent(
    @Param('studentName') studentName: string,
  ): Promise<Enrollment[]> {
    return this.enrollmentService.getEnrollmentsByStudent(studentName);
  }

  @Get('/course/:courseID')
  async getEnrollmentsByCourseID(
    @Param('courseID') courseID: string,
  ): Promise<Enrollment[]> {
    return this.enrollmentService.getEnrollmentsByCourseID(courseID);
  }

  @Post()
  async createEnrollment(@Body() enrollment: Enrollment): Promise<Enrollment> {
    return this.enrollmentService.createEnrollment(enrollment);
  }

  @Delete('/:enrollmentID')
  async deleteEnrollment(
    @Param('enrollmentID') enrollmentID: number,
  ): Promise<void> {
    return this.enrollmentService.deleteEnrollment(enrollmentID);
  }
}
