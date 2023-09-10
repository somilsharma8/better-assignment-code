// import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// import recursiveTaskTrigger from '../../../controller/triggerController.js';
import {testFun, recursiveTaskTrigger} from '../../../controller/triggerController.js';

const fileDumpPath = '../../../fileDump/';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const taskMutations = {
  uploadFile: async (_, { inputObj }) => {
    try {
      console.log('Task triggered :::::: ', inputObj);
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
      // const payload = fileContent.split(/\d+\)\n/);
      // payload.shift(); // Complexity O(n)
      // const payload = fileContent.split(/(\n\d+\)\n)/); //||(\d+[\n]\n)
      // console.log('FILE DATA ::::::: ', payload);

      let resp;
      resp = recursiveTaskTrigger(payload);
      //.then((recursiveResult) => console.log('RESULT ACQUIRED ::::: ', recursiveResult));
      // const resp = await testFun('blabla');
      // console.log('RESULT OF ALL INPUTS ::::::: ', resp);
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
  login: async (_, { email, password }) => {
    // Add find query to fetch user details from db
    // const user = await db.find({email: email, password: password});
    const { id, permissions, roles } = {
      id: 1,
      active: true,
      firstName: "Somil",
      lastName: "Sharma",
      role: "admin",
      mobile: '999999999',
      email: 'somilsharma8@gmail.com',
      permissions: [],
      roles: [],
    };
  },
};

export default taskMutations;
