import { Mongoose } from 'mongoose';
import { BookSchema } from './schemas/book';

export const booksProviders = [
  {
    provide: 'BookModel',
    useFactory: (mongoose: Mongoose) => mongoose.model('Book', BookSchema),
    inject: ['db_connection'],
  },
];