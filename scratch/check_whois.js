const net = require('net');

function queryWhois(domain, server) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    let response = '';

    client.connect(43, server, () => {
      client.write(domain + '\r\n');
    });

    client.on('data', (data) => {
      response += data.toString();
    });

    client.on('end', () => {
      resolve(response);
    });

    client.on('error', (err) => {
      reject(err);
    });
    
    setTimeout(() => {
      client.destroy();
      reject(new Error('Timeout connecting to WHOIS server'));
    }, 10000);
  });
}

(async () => {
  try {
    console.log('Querying whois.nic.one for accounts.one...');
    const result = await queryWhois('accounts.one', 'whois.nic.one');
    console.log('\n--- WHOIS Response ---');
    console.log(result);
    console.log('----------------------');
  } catch (err) {
    console.error('WHOIS query failed:', err.message);
  }
})();
