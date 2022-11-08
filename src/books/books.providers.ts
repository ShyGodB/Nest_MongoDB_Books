import { Mongoose } from 'mongoose';
import { BookSchema } from './schemas/book';

export const booksProviders = [
  {
    provide: 'CAT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Book', BookSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];