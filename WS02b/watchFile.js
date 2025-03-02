const fs = require('fs');

fs.watch('watch.txt', (eventType, filename) => {
    console.log(`File ${filename} changed! Event: ${eventType}`);
});

console.log('Watching for file changes...');
