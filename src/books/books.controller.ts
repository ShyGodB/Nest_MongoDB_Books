import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Book } from '@libs/db/models/book.model';
import { CreateBookDto } from './dto/book.create.dto';
import { ReturnModelType } from "@typegoose/typegoose";
import { BooksService } from "./books.service";

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/create')
  async create(@Body() book: Book): Promise<Book> {
    const res = await this.booksService.create(book);
    console.log('res is', res)

    return res;
  }

  @Get('/getAll')
  async getAll() {
    return await this.booksService.getAll();
  }
}
