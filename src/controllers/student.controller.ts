import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { createStudentDTO } from 'src/dtos/create-student.dto';
import { Student } from 'src/entities/student.entity';
import { StudentService } from 'src/services/student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get('/count')
  async getStudentCount(): Promise<number> {
    return this.studentService.getStudentCount();
  }

  @Get('/:studentID')
  async getStudentByID(
    @Param('studentID') studentID: string,
  ): Promise<Student> {
    return this.studentService.getStudentByID(studentID);
  }

  @Get('/name/:studentName')
  async getStudentByName(
    @Param('studentName') studentName: string,
  ): Promise<Student[]> {
    return this.studentService.getStudentsByName(studentName);
  }

  @Post()
  async createStudent(@Body() student: createStudentDTO): Promise<Student> {
    return this.studentService.createStudent(student);
  }

  @Put('/update')
  async updateStudent(@Body() student: Student): Promise<Student> {
    return this.studentService.updateStudent(student);
  }

  @Delete('/:studentID')
  async deleteStudent(@Param('studentID') studentID: string): Promise<void> {
    return this.studentService.deleteStudent(studentID);
  }
}
