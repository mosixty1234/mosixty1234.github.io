const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// Connect to your MongoDB database
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new GridFSBucket(conn.db, { bucketName: 'uploads' });
  console.log('GridFSBucket initialized');
});

const getImageByFilename = async (req, res) => {
  const filename = req.params.filename;
  console.log('Fetching image with filename:', filename);

  try {
    // Find the file in the uploads.files collection
    const file = await conn.db.collection('uploads.files').findOne({ filename });

    if (!file) {
      console.log('No file exists with the given filename');
      return res.status(404).json({ error: 'No file exists' });
    }

    // Check if it's an image
    if (
      file.contentType === 'image/jpeg' ||
      file.contentType === 'image/png' ||
      file.contentType === 'image/jpg'
    ) {
      // Create a read stream from GridFSBucket
      const readstream = gfs.openDownloadStreamByName(filename);

      // Handle stream errors
      readstream.on('error', (err) => {
        console.error('Stream error:', err);
        res.status(500).json({ error: 'Error reading file' });
      });

      // Pipe the read stream to the response
      readstream.pipe(res);
    } else {
      console.log('File is not an image:', file.contentType);
      res.status(400).json({ error: 'Not an image' });
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getImageByFilename,
};