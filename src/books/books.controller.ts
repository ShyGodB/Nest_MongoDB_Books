import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';

class createBooksData {
    title: string
    author: string
    categorys: []
    score: number
}

class updateBooksData {
    title: string
    author: string
    categorys: []
    score: number
}

@Controller('')
@ApiTags('books')
export class BooksController {
    constructor(
        private BooksService: BooksService
    ){}

    async index() {
        return 'sadjfkasjhdfjas'
    }

    // 新增图书
    @Get('create')
    async create(@Body() createBooksData:createBooksData) {
        // await BookModel.create(createBooksData);
        return [
            { id: 1 },
            { id: 1 },
            { id: 1 },
            { id: 1 },
        ];
    }

    // 更新图书
    @Put('/update:id')
    update(@Param('id') id: string, @Body() body: updateBooksData): string {
        return '' + id;
    }

    // 全部图书列表
    @Get('/getAll')
    getAll() {
        return [];
    }

    // 图书列表，支持模糊搜索，支持分类查找
    @Get('')
    async list(@Param() id:string) {
        console.log('id is ' + id)
        const res = this.BooksService.sayHello();
        return res;
    }


}
