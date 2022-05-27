export class Question {
  constructor(private id: string, private text: string) {}

  public getId = (): string => {
    return this.id;
  };

  public getText = (): string => {
    return this.text;
  };
}
