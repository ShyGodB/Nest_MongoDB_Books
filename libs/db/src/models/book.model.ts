import {} from '@typegoose/typegoose';
import { prop } from 'typegoose';

export class Book {
    @prop()
    name: string

    // @prop()
    // author: string

    // @prop()
    // category: string[]

    // @prop()
    // score: number
}