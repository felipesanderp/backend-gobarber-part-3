import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailProviderDTO from '../dtos/IParseTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailProviderDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parsedTemplate = handlebars.compile(templateFileContent);

    return parsedTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
