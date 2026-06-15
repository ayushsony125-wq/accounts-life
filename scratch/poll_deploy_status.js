const { execSync } = require('child_process');

function getLatestDeploymentStatus() {
  try {
    const output = execSync('npx vercel list', { encoding: 'utf8' });
    const lines = output.split('\n');
    for (const line of lines) {
      if (line.includes('Production')) {
        const parts = line.trim().split(/\s+/);
        // Find deployment link and status
        // Age is parts[0] + parts[1], Project is parts[2], Url is parts[3], Status is parts[4]
        // Let's print out the line for clarity
        console.log('Latest Production Deployment line:', line);
        if (line.includes('Ready')) return 'Ready';
        if (line.includes('Building')) return 'Building';
        if (line.includes('Error')) return 'Error';
        return parts[4] || 'Unknown';
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
