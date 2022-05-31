export class Project {
  constructor(private id: string, private name: string) {}

  public getProjectId = (): string => {
    return this.id;
  };

  public getProjectName = (): string => {
    return this.name;
  };
}
