import { InquirerResponse } from "./InquirerResponse.js";

export default interface IConsoleProvider {
  simpleInput(message: string, defaultValue?: string): Promise<InquirerResponse>;
  listInput(message: string, choices: string[]): Promise<InquirerResponse>;
}
