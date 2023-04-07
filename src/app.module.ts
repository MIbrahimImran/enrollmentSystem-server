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

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'your_username',
    //   password: 'your_password',
    //   database: 'your_database',
    //   entities: [Course, Student, Enrollment],
    //   synchronize: true,
    // }),
    // TypeOrmModule.forFeature([Course, Student, Enrollment]),
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
