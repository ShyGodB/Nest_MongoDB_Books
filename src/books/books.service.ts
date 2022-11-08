import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/Book.schema';
import { createBookDto } from './dto/createBook.dto';

@Injectable()
export class BooksService {
  // 依赖注入
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}
  
  async create(createBookDto: createBookDto): Promise<Book> {
    const createdBook = new this.BookModel(createBookDto);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.BookModel.find().exec();
  }

  sayHello() {
    return 'hello';
  }
}
