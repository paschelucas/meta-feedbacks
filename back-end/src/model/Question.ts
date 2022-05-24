export class Question {
  constructor(private questionId: string, private questionText: string) {}

  public getId = (): string => {
    return this.questionId;
  };

  public getText = (): string => {
    return this.questionText;
  };
}
