import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';


export class CreateBookDto {
  @IsNotEmpty({ message: '请填写图书名称' })
  readonly name: string;

  @IsNotEmpty({ message: '请填写作者名称' })
  readonly author: string;

  @IsArray({ message: '图书所属分类不是一个有效的数组' })
  readonly category: string[];

  @IsNumber()
  readonly score: number;
}

