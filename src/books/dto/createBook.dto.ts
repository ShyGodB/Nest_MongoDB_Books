import { Prop } from '@nestjs/mongoose';


export class createBookDto {
    @Prop()
    name: string;
    
    @Prop()
    author: string;
  
    @Prop()
    category: string[]
  
    @Prop()
    score: number;
  }