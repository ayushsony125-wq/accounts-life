const { execSync } = require('child_process');

function getLatestDeploymentStatus() {
  try {
    const output = execSync('npx vercel list', { encoding: 'utf8' });
    // Strip ANSI escape codes
    const cleanOutput = output.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
    const lines = cleanOutput.split('\n');
    for (const line of lines) {
      if (line.includes('Production')) {
        console.log('Cleaned Production Line:', line.trim());
        if (line.includes('● Ready') || line.toLowerCase().includes('ready')) return 'Ready';
        if (line.includes('● Building') || line.toLowerCase().includes('building')) return 'Building';
        if (line.includes('● Error') || line.toLowerCase().includes('error')) return 'Error';
        return 'Unknown';
      }
    }
  } catch (err) {
    console.error('Failed to run vercel list:', err.message);
  }
  return 'Unknown';
}

console.log('Polling Vercel deployment status...');
const maxAttempts = 30; // 30 * 10 = 300 seconds (5 mins)
let attempt = 0;

const interval = setInterval(() => {
  attempt++;
  const status = getLatestDeploymentStatus();
  console.log(`[Attempt ${attempt}/${maxAttempts}] Current Status: ${status}`);

  if (status === 'Ready') {
    console.log('🎉 Vercel deployment is Ready!');
    clearInterval(interval);
    process.exit(0);
  } else if (status === 'Error') {
    console.error('❌ Vercel deployment failed with Error.');
    clearInterval(interval);
    process.exit(1);
  }

  if (attempt >= maxAttempts) {
    console.error('❌ Polling timed out.');
    clearInterval(interval);
    process.exit(1);
  }
}, 10000);
