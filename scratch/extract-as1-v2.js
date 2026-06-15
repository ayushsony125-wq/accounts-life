const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const PDF_PATH = path.join(__dirname, '../public/pdfs/as-1.pdf');
const TXT_PATH = path.join(__dirname, 'as1-v2-text.txt');

async function main() {
  if (!fs.existsSync(PDF_PATH)) {
    console.error('PDF file does not exist:', PDF_PATH);
    process.exit(1);
  }

  const dataBuffer = fs.readFileSync(PDF_PATH);
  console.log('Parsing PDF...');
  
  try {
    const data = await pdf(dataBuffer);
    console.log('--- PDF Metadata ---');
    console.log('Pages:', data.numpages);
    console.log('Version:', data.version);
    console.log('Info:', JSON.stringify(data.info, null, 2));

    fs.writeFileSync(TXT_PATH, data.text, 'utf-8');
    console.log('Text extracted successfully. Saved to:', TXT_PATH);
  } catch (err) {
    console.error('Error during parsing:', err);
    process.exit(1);
  }
}

main();
