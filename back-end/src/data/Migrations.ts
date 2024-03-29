import { BaseDatabase } from "./BaseDatabase";

export class Migrations extends BaseDatabase {
  public printError = (error: any) => {
    console.log(error.sqlMessage || error.message);
  };

  public createTables = () =>
    this.connection
      .raw(
        `
CREATE TABLE IF NOT EXISTS users(  
  user_id VARCHAR(255) PRIMARY KEY NOT NULL,
  user_name VARCHAR(255) UNIQUE NOT NULL,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_role ENUM ('admin',  'mentor', 'gestor')
);

CREATE TABLE IF NOT EXISTS leaguers(
  leaguer_id VARCHAR(255) PRIMARY KEY NOT NULL,
  leaguer_name VARCHAR(255) UNIQUE NOT NULL,
  leaguer_turma ENUM ('turma-piloto', 'turma-1', 'turma-2', 'turma-3') NOT NULL,
  leaguer_fase ENUM ('introducao', 'labs', 'beta') NOT NULL,
  leaguer_responsavel VARCHAR(255),
  FOREIGN KEY (leaguer_responsavel) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS questions(
  question_id VARCHAR(255) PRIMARY KEY NOT NULL,
  question_text VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS answers(
  answer_id VARCHAR(255) PRIMARY KEY NOT NULL,
  question_id VARCHAR(255) NOT NULL,
  answer_text VARCHAR(255) NOT NULL,
  leaguer_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions (question_id),
  FOREIGN KEY (leaguer_id) REFERENCES leaguers (leaguer_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS forms (
  form_id VARCHAR(255) NOT NULL PRIMARY KEY,
  form_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS forms_and_its_questions(
  bond_id VARCHAR(255) NOT NULL PRIMARY KEY,
  form_id VARCHAR(255) NOT NULL,
  question_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (form_id) REFERENCES forms (form_id),
  FOREIGN KEY (question_id) REFERENCES questions (question_id)
);

CREATE TABLE IF NOT EXISTS projects(  
  project_id VARCHAR(255) PRIMARY KEY NOT NULL,
  project_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS projects_and_its_leaguers(
  bond_id VARCHAR(255) NOT NULL PRIMARY KEY,
  project_id VARCHAR(255) NOT NULL,
  leaguer_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects (project_id),
  FOREIGN KEY (leaguer_id) REFERENCES leaguers (leaguer_id)
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
