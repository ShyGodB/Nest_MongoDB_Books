import { IsNotEmpty, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class UpdateBookDto {
    @IsNotEmpty({ message: '图书编号不可为空' })
    readonly _id: string;

    @IsNotEmpty({ message: '请填写图书名称' })
    readonly name: string;

    @IsNotEmpty({ message: '请填写作者名称' })
    readonly author: string;

    @IsArray({ message: '图书所属分类不是一个有效的数组' })
    readonly category: string[];

    @IsNumber()
    readonly score: number;

    @IsBoolean()
    readonly isDel: boolean;
  }