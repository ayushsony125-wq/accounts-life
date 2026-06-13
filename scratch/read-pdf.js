const fs = require('fs');
const path = require('path');

const pdfPath = 'C:\\Users\\ayush\\Downloads\\89095asb-aps2918-as1.pdf';

if (fs.existsSync(pdfPath)) {
  const content = fs.readFileSync(pdfPath);
  console.log('PDF File size:', content.length, 'bytes');
  // Print first 500 bytes as string
  console.log('Header:', content.toString('ascii', 0, 500));
} else {
  console.log('PDF file not found at:', pdfPath);
}
