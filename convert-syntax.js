// Utility script to convert pre/code blocks to CodeBlock components
const fs = require('fs');
const path = require('path');

const files = [
  'src/components/konular/array/Array.js',
  'src/components/konular/linkedlist/LinkedList.js', 
  'src/components/konular/stack/Stack.js',
  'src/components/konular/queue/Queue.js',
  'src/components/konular/hashmap/HashMap.js'
];

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace pre/code blocks with CodeBlock
  content = content.replace(
    /<pre><code>\{\`([^`]+)`\}<\/code><\/pre>/g,
    '<CodeBlock language="csharp">\n{`$1`}\n          </CodeBlock>'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
});

console.log('All files updated with syntax highlighting!');
