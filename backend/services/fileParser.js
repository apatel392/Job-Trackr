// backend/utils/resumeParser.js
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

exports.parseResume = async (file) => {
  if (!file) throw new Error('parseResume: file is required');
  if (!fs.existsSync(file.path)) throw new Error(`parseResume: file not found: ${file.path}`);

  const mimetype = file.mimetype.toLowerCase();

  if (mimetype === 'application/pdf') {
    const buffer = fs.readFileSync(file.path);
    const data = await pdfParse(buffer);
    return (data.text || '').trim();
  }

  if (
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype === 'application/msword'
  ) {
    const { value } = await mammoth.extractRawText({ path: file.path });
    return (value || '').trim();
  }

  throw new Error('Unsupported file type. Upload PDF or DOCX only.');
}

