async function poll() {
  console.log('Polling Vercel deployment status...');
  const maxRetries = 30; // 30 * 10s = 5 minutes
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch('https://accounts-life.vercel.app/admin/login');
      const html = await res.text();
      // If the page is live and doesn't contain the layout wrapper for unauthenticated users, the new deploy is live!
      const isOldDeploy = html.includes('max-w-7xl mx-auto px-6 py-8');
      if (!isOldDeploy) {
        console.log(`[Attempt ${i + 1}] NEW DEPLOYMENT IS LIVE! Bypassed layout wrapper found.`);
        return true;
      }
      console.log(`[Attempt ${i + 1}] Old deployment still serving...`);
    } catch (err) {
      console.log(`[Attempt ${i + 1}] failed:`, err.message);
    }
    await new Promise(r => setTimeout(r, 10000));
  }
  console.error('Timeout waiting for deployment.');
  return false;
}
poll().then(success => process.exit(success ? 0 : 1));
