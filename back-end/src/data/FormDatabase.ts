import { Form } from "../model/Form";
import { BaseDatabase } from "./BaseDatabase";

export class FormDatabase extends BaseDatabase {
  protected TABLE_NAME = "forms";

  public createForm = async (form: Form): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert({
        form_id: form.getFormId(),
        form_name: form.getFormName(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getAllForms = async (): Promise<Form[]> => {
    try {
      const forms = await this.connection(this.TABLE_NAME);
      const formsArray = new Array();

      for (let form of forms) {
        const questions = await this.connection("forms_and_its_questions")
        .join("questions", "questions.question_id", "forms_and_its_questions.question_id")
        .where("forms_and_its_questions.form_id", form.form_id)
        .select("questions.question_id", "questions.question_text");

        form = {
          ...form,
          questions
        }
        formsArray.push(form)
      }

      return formsArray;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getFormById = async (id: string): Promise<Form[] | undefined> => {
    try {
      const [foundForm] = await this.connection(this.TABLE_NAME).where(
        "form_id",
        id
      );

      return foundForm;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getFormByName = async (name: string): Promise<Form[] | undefined> => {
    try {
      const [foundForm] = await this.connection(this.TABLE_NAME).where(
        "form_name",
        name
      );

      return foundForm;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public deleteForm = async (id: string): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).where("form_id", id).del();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
