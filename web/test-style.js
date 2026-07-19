/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');
https.get('https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const style = JSON.parse(data);
    const bg = style.layers.find(l => l.id === 'background');
    const water = style.layers.find(l => l.id === 'water');
    console.log("Background paint:", bg.paint);
    console.log("Water paint:", water.paint);
  });
});
