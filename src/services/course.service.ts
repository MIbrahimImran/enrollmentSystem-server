import { Injectable } from '@nestjs/common';
import { Course } from 'src/entities/course.entity';

@Injectable()
export class CourseService {
  mockCourses: Course[] = [
    {
      courseID: 'CSC 436',
      title: 'Software Engineering',
      instructor: 'Dr. Kiper',
      credits: 3,
    },
    {
      courseID: 'CSC 437',
      title: 'Software Testing',
      instructor: 'Dr. Kiper',
      credits: 3,
    },
    {
      courseID: 'CSC 438',
      title: 'Software Project Management',
      instructor: 'Dr. Kiper',
      credits: 3,
    },
  ];

  constructor() {}

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
    this.mockCourses.push(course);
    return course;
  }

  async deleteCourse(courseID: string): Promise<void> {
    this.mockCourses = this.mockCourses.filter(
      (course) => course.courseID !== courseID,
    );
  }
}
