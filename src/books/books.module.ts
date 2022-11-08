import { BooksService } from './books.service';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BooksController } from './books.controller';
import { Book } from '@libs/db/models/book.model';

@Module({
    imports: [TypegooseModule.forFeature([Book])],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
