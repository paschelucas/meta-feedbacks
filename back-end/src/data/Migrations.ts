import { BaseDatabase } from "./BaseDatabase";

export class Migrations extends BaseDatabase {
  public printError = (error: any) => {
    console.log(error.sqlMessage || error.message);
  };

  public createTables = () =>
    this.connection
      .raw(
        `
        CREATE TABLE users(  
          user_id VARCHAR(255) PRIMARY KEY NOT NULL,
          user_name VARCHAR(255) UNIQUE NOT NULL,
          user_email VARCHAR(255) UNIQUE NOT NULL,
          user_password VARCHAR(255) NOT NULL,
          user_role ENUM ('admin',  'mentor', 'gestor')
      );

      CREATE TABLE leaguers(
        leaguer_id VARCHAR(255) PRIMARY KEY NOT NULL,
        leaguer_name VARCHAR(255) UNIQUE NOT NULL,
        leaguer_turma ENUM ('turma-piloto', 'turma-1', 'turma-2', 'turma-3') UNIQUE NOT NULL,
        leaguer_fase ENUM ('introducao', 'labs', 'beta') NOT NULL,
        leaguer_responsavel VARCHAR(255),
        FOREIGN KEY (leaguer_responsavel) REFERENCES users (user_id)
    );
        CREATE TABLE questions(
    question_id VARCHAR(255) PRIMARY KEY NOT NULL,
    question_text VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE answers(
  answer_id VARCHAR(255) PRIMARY KEY NOT NULL,
  question_id VARCHAR(255) NOT NULL,
  answer_text VARCHAR(255) NOT NULL,
  leaguer_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions (question_id),
  FOREIGN KEY (leaguer_id) REFERENCES leaguers (leaguer_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE forms(  
  form_id VARCHAR(255) NOT NULL,
  form_name VARCHAR(255) NOT NULL,
  question_id VARCHAR(255) NOT NULL
);
   `
      )
      .then(() => {
        console.log("Tabelas criadas");
      })
      .catch(this.printError);

  public closeConnection = () => {
    this.connection.destroy();
  };
}

const myMigrations = new Migrations();

myMigrations.createTables().finally(myMigrations.closeConnection);
