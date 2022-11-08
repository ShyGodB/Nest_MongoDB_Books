import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';
import { GetBookDto } from './dto/get-book.dto';
import { Book } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // 添加图书
  @Post()
  async create(@Body() createBookDto: CreateBookDto) {

    return this.booksService.create(createBookDto);
  }

  // 修改图书
  @Put()
  async update(@Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto)
  }

  // 图书列表：1、全部；2、根据书名模糊查找；3、根据图书所属分类查找
  @Get()
  async get(@Query() getBookDto: GetBookDto): Promise<Book[]> {
    console.log('----', getBookDto)
    console.log('+++++', JSON.parse(getBookDto.category))
    if (getBookDto && getBookDto.isAll === 'true') {
        return this.booksService.findAll();
    } else {
        return this.booksService.get({
            name: getBookDto && getBookDto.name || null,
            category: getBookDto && getBookDto.category ? JSON.parse(getBookDto.category || '[]') : null,
        });
    }
    // return this.booksService.findAll();
  }
}