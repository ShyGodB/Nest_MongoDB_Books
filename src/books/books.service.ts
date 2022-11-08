import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(@Inject('CAT_MODEL') private readonly catModel: Model<Book>) {}

  async create(createCatDto: CreateBookDto): Promise<Book> {
    const createdCat = this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Book[]> {
    return this.catModel.find().exec();
  }
}