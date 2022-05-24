export class Answer {
  constructor(
    private answerId: string,
    private questionId: string,
    private answerText: string,
    private leaguerId: string,
    private userId: string
  ) {}

  public getAnswerId = (): string => {
    return this.answerId;
  };

  public getQuestionId = (): string => {
    return this.questionId;
  };

  public getAnswerText = (): string => {
    return this.answerText;
  };

  public getLeaguerId = (): string => {
    return this.leaguerId;
  };
  
  public getUserId = (): string => {
    return this.userId;
  };
}
