export class ProjectAndItsLeaguers {
    constructor(
        private bondId: string,
        private projectId: string,
        private leaguerId: string
      ) {}
    
      public getBondId = (): string => {
        return this.bondId;
      };
      public getProjectId = (): string => {
        return this.projectId;
      };
      public getLeaguerId = (): string => {
        return this.leaguerId;
      };
}