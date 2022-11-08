import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(@Inject('CAT_MODEL') private readonly bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdCat = this.bookModel.create(createBookDto);
    return createdCat;
  }

  async update(updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookModel.findByIdAndUpdate({ _id: updateBookDto._id.toString() }, updateBookDto);
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async get({ name = '', category = null }): Promise<Book[]> {
    interface Filter {
      [key: string]: any;
    }
    
    let filter: Filter = {};
    if (name) filter.name = new RegExp(name, 'i') 
    if (category && category.length > 0) filter.category = { $in: category }

    console.log('--filter is ', filter)
    return this.bookModel.find(filter).exec();
  }
}