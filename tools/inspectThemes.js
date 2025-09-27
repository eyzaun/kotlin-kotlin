const themes = require('react-syntax-highlighter/dist/cjs/styles/prism');
console.log('Available themes:', Object.keys(themes));
if (themes.vscDarkPlus) {
  const keys = Object.keys(themes.vscDarkPlus);
  console.log('\nNumber of style rules in vscDarkPlus:', keys.length);
  console.log('\nSample entries from vscDarkPlus:');
  keys.slice(0, 20).forEach(k => {
    console.log(k, '=>', themes.vscDarkPlus[k]);
  });
} else {
  console.log('vscDarkPlus not found');
}

