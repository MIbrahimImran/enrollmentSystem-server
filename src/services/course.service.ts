import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course } from 'src/entities/course.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    private entityManager: EntityManager, // private readonly enrollmentService: EnrollmentService,
  ) {}

  async getAllCourses(): Promise<Course[]> {
    return await this.entityManager.query(`
      SELECT *
      FROM courses
    `);
  }

  async getCoursesByInstructor(instructor: string): Promise<Course[]> {
    return await this.entityManager.query(
      `
      SELECT *
      FROM courses
      WHERE instructor = ?
    `,
      [instructor],
    );
  }

  async getCourseByID(courseID: string): Promise<Course> {
    const result = await this.entityManager.query(
      `
      SELECT *
      FROM courses
      WHERE courseID = ?
    `,
      [courseID],
    );
    return result[0];
  }

  async getCoursesByTitle(title: string): Promise<Course[]> {
    return await this.entityManager.query(
      `
      SELECT *
      FROM courses
      WHERE title = ?
    `,
      [title],
    );
  }

  async createCourse(course: Course): Promise<Course> {
    if (await this.getCourseByID(course.courseID)) {
      throw new ConflictException('Course already exists');
    }

    await this.entityManager.query(
      `
      INSERT INTO courses (courseID, title, instructor, credits)
      VALUES (?, ?, ?, ?)
    `,
      [course.courseID, course.title, course.instructor, course.credits],
    );

    return course;
  }

  async deleteCourse(courseID: string): Promise<void> {
    this.deleteEnrollmentsByCourseID(courseID);
    await this.entityManager.query(
      `
      DELETE FROM courses
      WHERE courseID = ?
    `,
      [courseID],
    );
  }

  async deleteEnrollmentsByCourseID(courseID: string): Promise<void> {
    const result = await this.entityManager.query(
      `
      DELETE FROM enrollments
      WHERE courseID = ?
    `,
      [courseID],
    );

    if (result.affected === 0) {
      throw new NotFoundException('Enrollment not found');
    }
  }
}
