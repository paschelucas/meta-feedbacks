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