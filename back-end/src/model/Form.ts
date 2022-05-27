export class Form {
  constructor(private formId: string, private formName: string) {}

  public getFormId = (): string => {
    return this.formId;
  };

  public getFormName = (): string => {
    return this.formName;
  };
}
