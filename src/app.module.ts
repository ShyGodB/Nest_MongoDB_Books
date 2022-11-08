import { DbModule } from './../libs/db/src/db.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    DbModule,
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
