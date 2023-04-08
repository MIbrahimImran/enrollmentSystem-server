import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { Course } from 'src/entities/course.entity';
import { CourseService } from 'src/services/course.service';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  @Get('/count')
  async getCourseCount(): Promise<number> {
    return this.courseService.getCourseCount();
  }

  @Get('/:courseID')
  async getCourseByID(@Param('courseID') courseID: string): Promise<Course> {
    return this.courseService.getCourseByID(courseID);
  }

  @Get('/instructor/:instructor')
  async getCoursesByInstructor(
    @Param('instructor') instructor: string,
  ): Promise<Course[]> {
    return this.courseService.getCoursesByInstructor(instructor);
  }

  @Get('/title/:title')
  async getCoursesByTitle(@Param('title') title: string): Promise<Course[]> {
    return this.courseService.getCoursesByTitle(title);
  }

  @Post()
  async createCourse(@Body() course: Course): Promise<Course> {
    return this.courseService.createCourse(course);
  }

  @Put('/update')
  async updateCourse(@Body() course: Course): Promise<Course> {
    return this.courseService.updateCourse(course);
  }

  @Delete('/:courseID')
  async deleteCourse(@Param('courseID') courseID: string): Promise<void> {
    return this.courseService.deleteCourse(courseID);
  }
}
