export class CreateBookDto {
  readonly name: string;
  readonly author: string;
  readonly category: string[];
  readonly score: number;
}