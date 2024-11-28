import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

// Create output directory if it doesn't exist
const outputDir = path.resolve('plugin-dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(outputDir, 'dry-eyes-assessment.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', () => {
  console.log(`Plugin ZIP created: ${archive.pointer()} total bytes`);
});

// Handle warnings and errors
archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add the built files
archive.directory('dist/', 'dist');

// Add the PHP files
archive.file('dry-eyes-assessment.php', { name: 'dry-eyes-assessment.php' });

// Add readme and other documentation
archive.file('README.md', { name: 'README.md' });

// Finalize the archive
archive.finalize();