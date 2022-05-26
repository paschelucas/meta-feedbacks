export default class Leaguer {
    
    constructor(
        private leaguer_id: string,
        private leaguer_name: string,
        private leaguer_turma: TurmaRole,
        private leaguer_fase: FaseRole,
        private leaguer_responsavel: string
        
    ){}

    getLeaguerId(){
        return this.leaguer_id
    }

    getLeaguerName(){
        return this.leaguer_name
    }

    getLeaguerTurma(){
        return this.leaguer_turma
    }

    getLeaguerFase(){
        return this.leaguer_fase
    }

    getLeaguerResponsavel(){
        return this.leaguer_responsavel
    }

    static stringToTurmaRole(input: string): TurmaRole{
        switch (input) {
            case 'turma-piloto':
              return TurmaRole.PILOTO;
            case 'turma-1':
              return TurmaRole.TURMA1;
            case 'turma-2':
              return TurmaRole.TURMA2;
            case 'turma-3':
              return TurmaRole.TURMA3;
            default:
              throw new Error("Invalid user role");
          }
    }

    static stringToFaseRole(input: string): FaseRole{
        switch (input) {
            case 'introducao':
              return FaseRole.INTRO;
            case 'labs':
              return FaseRole.LABS;
            case 'beta':
              return FaseRole.BETA
            default:
              throw new Error("Invalid user role");
          }
    }
    

}

export enum TurmaRole{
    PILOTO = 'turma-piloto',
    TURMA1 = 'turma-1',
    TURMA2 = 'turma-2',
    TURMA3 = 'turma-3'
}

export enum FaseRole{
    INTRO = 'introducao',
    LABS = 'labs',
    BETA = 'beta'
}