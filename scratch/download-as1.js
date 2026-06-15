const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const urlString = 'https://resource.cdn.icai.org/89095asb-aps2918-as1.pdf';
const dest = path.join(__dirname, '../public/pdfs/as-1.pdf');

// Ensure public/pdfs exists
const dir = path.dirname(dest);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log(`Downloading official AS 1 PDF from: ${urlString}`);
console.log(`Saving to: ${dest}`);

const parsedUrl = new URL(urlString);
const options = {
  hostname: parsedUrl.hostname,
  path: parsedUrl.pathname,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
};

const file = fs.createWriteStream(dest);

const req = https.get(options, (response) => {
  if (response.statusCode === 301 || response.statusCode === 302) {
    console.log(`Redirected to: ${response.headers.location}`);
    // Handle redirect if necessary...
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Failed to download PDF. Status Code: ${response.statusCode}`);
    console.error(`Headers:`, JSON.stringify(response.headers, null, 2));
    process.exit(1);
  }

  response.pipe(file);

  file.on('finish', () => {
    file.close(() => {
      console.log('Download complete!');
      const stats = fs.statSync(dest);
      console.log(`File Size: ${stats.size} bytes`);
      process.exit(0);
    });
  });
});

req.on('error', (err) => {
  try {
    fs.unlinkSync(dest);
  } catch {}
  console.error(`Error downloading file: ${err.message}`);
  process.exit(1);
});
