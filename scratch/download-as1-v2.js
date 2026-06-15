const http = require('https');
const fs = require('fs');
const path = require('path');

const URL = 'https://resource.cdn.icai.org/87691bos-aps2158-ch4u1.pdf';
const DEST = path.join(__dirname, '../public/pdfs/as-1.pdf');

console.log('Downloading PDF from:', URL);
console.log('Saving to:', DEST);

const file = fs.createWriteStream(DEST);
http.get(URL, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Error: Status code ${response.statusCode}`);
    process.exit(1);
  }
  response.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      console.log('Download complete. File size:', fs.statSync(DEST).size, 'bytes');
    });
  });
}).on('error', (err) => {
  fs.unlinkSync(DEST);
  console.error('Download failed:', err.message);
  process.exit(1);
});
