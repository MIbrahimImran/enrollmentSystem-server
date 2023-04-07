import { ConflictException, Injectable } from '@nestjs/common';
import { Course } from 'src/entities/course.entity';

@Injectable()
export class CourseService {
  mockCourses: Course[] = [];

  async getAllCourses(): Promise<Course[]> {
    return this.mockCourses;
  }

  async getCoursesByInstructor(instructor: string): Promise<Course[]> {
    return this.mockCourses.filter(
      (course) => course.instructor === instructor,
    );
  }

  async getCourseByID(courseID: string): Promise<Course> {
    return this.mockCourses.find((course) => course.courseID === courseID);
  }

  async getCoursesByTitle(title: string): Promise<Course[]> {
    return this.mockCourses.filter((course) => course.title === title);
  }

  async createCourse(course: Course): Promise<Course> {
    const isUnique = await this.isCourseIDUnique(course.courseID);
    if (!isUnique) throw new ConflictException('Course ID already exists');
    this.mockCourses.push(course);
    return course;
  }

  async deleteCourse(courseID: string): Promise<void> {
    this.mockCourses = this.mockCourses.filter(
      (course) => course.courseID !== courseID,
    );
  }

  private async isCourseIDUnique(courseID: string): Promise<boolean> {
    return this.mockCourses.every((course) => course.courseID !== courseID);
  }
}
