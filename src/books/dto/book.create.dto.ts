import { prop } from "typegoose";

export class CreateBookDto {
    // 名称
    @prop()
    name: string

    // 作者
    @prop()
    author: string

    // 所属分类
    @prop()
    category: string[]

    // 评分，0 - 5
    @prop()
    score: number
}