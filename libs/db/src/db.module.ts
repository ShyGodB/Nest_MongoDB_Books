import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Book } from './models/book.model';

const models = TypegooseModule.forFeature([Book]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/books_nestjs'),
    models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
