const fs = require('fs');

fs.unlink('temp.txt', err => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully');
});
