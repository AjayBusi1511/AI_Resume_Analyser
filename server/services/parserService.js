import fs from 'fs';
import { createRequire } from 'module';
import mammoth from 'mammoth';

const require = createRequire(import.meta.url);
const pdfParseLib = require('pdf-parse');
const pdfParse = pdfParseLib.default || pdfParseLib;

export const parseResume = async (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);

  if (filePath.endsWith('.pdf')) {
    const data = await pdfParse(fileBuffer);
    return data.text;
  }

  if (filePath.endsWith('.docx')) {
    const data = await mammoth.extractRawText({ buffer: fileBuffer });
    return data.value;
  }

  return 'Unsupported file format';
};