const { fetchStandardDetail, fetchStandards } = require('../lib/learning-loader');

async function main() {
  console.log('=== DEBUG PUBLIC LOADERS ===\n');
  
  const asStandards = await fetchStandards('AS');
  console.log(`fetchStandards('AS') returned ${asStandards.length} items.`);
  console.log('AS Standards list slugs:', asStandards.map(s => s.id));

  console.log('\n--- fetchStandardDetail("as-1", "AS") ---');
  const as1 = await fetchStandardDetail('as-1', 'AS');
  console.log(JSON.stringify(as1, null, 2));

  console.log('\n--- fetchStandardDetail("as-2", "AS") ---');
  const as2 = await fetchStandardDetail('as-2', 'AS');
  console.log(JSON.stringify(as2, null, 2));
}

main().catch(console.error);
