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

      return forms;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getFormById = async (id: string): Promise<Form[] | undefined> => {
    try {
      const [foundForm] = await this.connection(this.TABLE_NAME).where(id);

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
}
