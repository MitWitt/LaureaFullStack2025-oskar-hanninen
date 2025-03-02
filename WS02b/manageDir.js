const fs = require('fs');

const dir = 'testDir';

fs.mkdir(dir, { recursive: true }, err => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }
    console.log('Directory created');

    fs.rmdir(dir, err => {
        if (err) {
            console.error('Error removing directory:', err);
            return;
        }
        console.log('Directory removed');
    });
});
