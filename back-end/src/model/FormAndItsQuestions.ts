export class FormAndItsQuestions {
  constructor(
    private bondId: string,
    private formId: string,
    private questionId: string
  ) {}

  public getBondId = (): string => {
    return this.bondId;
  };
  public getFormId = (): string => {
    return this.formId;
  };
  public getQuestionId = (): string => {
    return this.questionId;
  };
}
