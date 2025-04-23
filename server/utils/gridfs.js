const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

const initGFS = () => {
    const conn = mongoose.connection;
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); 
};
const getGFS = () => gfs;

module.exports = { initGFS, getGFS };