const http = require('https');
const fs = require('fs');
const path = require('path');

const LIVE_URL = 'https://accounts-one-ak-s-projectsakk.vercel.app/api/pdfs/as-1';

console.log('Downloading live PDF from:', LIVE_URL);
http.get(LIVE_URL, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));

  const data = [];
  res.on('data', (chunk) => data.push(chunk));
  res.on('end', () => {
    const buffer = Buffer.concat(data);
    console.log('Downloaded size:', buffer.length);
    console.log('Content (first 1000 chars):');
    console.log(buffer.toString('utf8').substring(0, 1000));
  });
}).on('error', (err) => {
  console.error('Request failed:', err);
});
