async function poll() {
  console.log('Polling Vercel deployment status for search dark mode fixes...');
  const maxRetries = 30; // 30 * 10s = 5 minutes
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch('https://accounts-life.vercel.app/search');
      const html = await res.text();
      // If the page contains the dark mode class we added, the second deploy is live!
      const isNewDeploy = html.includes('dark:bg-[#1E2640]');
      if (isNewDeploy) {
        console.log(`[Attempt ${i + 1}] NEW SEARCH DEPLOYMENT IS LIVE!`);
        return true;
      }
      console.log(`[Attempt ${i + 1}] Previous deployment still active...`);
    } catch (err) {
      console.log(`[Attempt ${i + 1}] failed:`, err.message);
    }
    await new Promise(r => setTimeout(r, 10000));
  }
  console.error('Timeout waiting for deployment.');
  return false;
}
poll().then(success => process.exit(success ? 0 : 1));
