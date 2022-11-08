import { Document } from 'mongoose';

export interface Book extends Document {
  readonly name: string;
  readonly author: string;
  readonly category: string[];
  readonly score: number;
}