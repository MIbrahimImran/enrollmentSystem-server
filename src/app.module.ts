import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Student } from './entities/student.entity';
import { Enrollment } from './entities/enrollment.entity';
import { CourseService } from './services/course.service';
import { StudentService } from './services/student.service';
import { EnrollmentService } from './services/enrollment.service';
import { EnrollmentController } from './controllers/enrollment.controller';
import { StudentController } from './controllers/student.controller';
import { CourseController } from './controllers/course.controller';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Course, Student, Enrollment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Course, Student, Enrollment]),
  ],
  controllers: [
    AppController,
    CourseController,
    StudentController,
    EnrollmentController,
  ],
  providers: [AppService, CourseService, StudentService, EnrollmentService],
})
export class AppModule {}
