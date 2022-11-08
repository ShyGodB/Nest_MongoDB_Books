import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'db_connection',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://localhost/book'),
  },
];