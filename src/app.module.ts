import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1',
      {
        connectTimeoutMS: 5000,
      },
    ),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
