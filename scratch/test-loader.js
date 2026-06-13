const { fetchStandards } = require('../lib/learning-loader');

async function main() {
  console.log('--- TEST LOADER AS ---');
  const asStds = await fetchStandards('AS');
  asStds.forEach(s => {
    if (s.id.includes('intro') || s.id === 'as-1') {
      console.log(`ID: ${s.id}`);
      console.log(`Code: ${s.code}`);
      console.log(`Title: "${s.title}"`);
      console.log(`ShortTitle: "${s.shortTitle}"`);
      console.log(`Framework: ${s.framework}`);
      console.log('---');
    }
  });

  console.log('\n--- TEST LOADER IND AS ---');
  const indAsStds = await fetchStandards('Ind AS');
  indAsStds.forEach(s => {
    if (s.id.includes('intro') || s.id === 'ind-as-1') {
      console.log(`ID: ${s.id}`);
      console.log(`Code: ${s.code}`);
      console.log(`Title: "${s.title}"`);
      console.log(`ShortTitle: "${s.shortTitle}"`);
      console.log(`Framework: ${s.framework}`);
      console.log('---');
    }
  });
}

main().catch(console.error);
