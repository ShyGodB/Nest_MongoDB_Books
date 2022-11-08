import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { Book } from '@libs/db/models/book.model';
 
@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private readonly bookModel: ReturnModelType<typeof Book>
  ) {}
 
  async create(book) {
    console.log('book is ', book);
    const res = await this.bookModel.create({
      name: "Node.js 实战"
    });
    return res;
  }

  async getAll() {
    return await this.bookModel.find().exec();
  }
}