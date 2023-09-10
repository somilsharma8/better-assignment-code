// import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { recursiveTaskTrigger} from '../../../controller/triggerController.js';

const fileDumpPath = '../../../fileDump/';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const taskMutations = {
  uploadFile: async (_, { inputObj }) => {
    try {
      console.log('UploadFile has been triggered!!!!!');
      const { createReadStream, filename, mimetype, encoding } = await inputObj.file;

      // const stream = createReadStream();
      const pathName = path.join(__dirname, `${fileDumpPath}${filename}`);
      const writeStream = fs.createWriteStream(pathName);
      // await stream.pipe(writeStream);
      await new Promise((resolve, reject) =>
        createReadStream()
          .pipe(writeStream)
          .on('finish', resolve)
          .on('error', reject)
      );

      // Reading the input file
      const fileContent = await fs.readFileSync(pathName, 'utf-8');

      if(fileContent.length === 0)
        return {
          message: 'No data found in uploaded file!!!',
          status: 400,
        };

      const payload = fileContent.split(/\n\n/);
      const resp = recursiveTaskTrigger(payload);

      await fs.writeFileSync(`${pathName}-output`, resp, 'utf-8');

      return {
        result: `File downloaded to ${path.join(__dirname, `${fileDumpPath}`)}`,
        message: 'Output generated successfully!!!',
        status: 200,
      };
    } catch (error) {
      console.log('Error while processing file ::::: ', error);
    }
  },
};

export default taskMutations;
