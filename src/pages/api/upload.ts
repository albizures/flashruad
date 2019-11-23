import { RequestHandler, send } from 'micro';
import { upload } from 'now-storage';
import Busboy from 'busboy';
import { IncomingMessage } from 'http';
import fs from 'fs';
import util from 'util';

const writeFile = util.promisify(fs.writeFile);

interface Body {
  file: NodeJS.ReadableStream;
  ext: string;
}

const toBuffer = (file: NodeJS.ReadableStream): Promise<Buffer> => {
  return new Promise<Buffer>((resolve) => {
    var bufs = [];
    file.on('data', (data) => {
      bufs.push(data);
    });

    file.on('end', () => {
      resolve(Buffer.concat(bufs));
    });
  });
};

const parseBody = (req: IncomingMessage): Promise<Body> => {
  const busboy = new Busboy({ headers: req.headers });
  return new Promise<Body>((resolve) => {
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      resolve({ file, ext: fieldname });
    });

    req.pipe(busboy);
  });
};

const handler: RequestHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return send(res, 404);
  }

  const { file, ext } = await parseBody(req);

  const content = await toBuffer(file);

  const now = Date.now();
  const name = `${now}${ext}`;
  await writeFile(`./${name}`, content);

  // const { url } = await upload(process.env.NOW_STORAGE_TOKEN, {
  //   name,
  //   content,
  // });

  return send(res, 200, { file: name, name });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
