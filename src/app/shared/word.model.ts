export class Word {
  constructor(
    public id: number,
    public english: string,
    public hungarian: string,
    public category?: string,
    public notes?: string,
    ) {}
}
