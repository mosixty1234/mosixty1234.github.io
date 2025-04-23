const express = require('express');
const imageRouter = express.Router();
const { getImageByFilename } = require('../controller/image');

imageRouter.get('/uploads/:filename', getImageByFilename);

module.exports = imageRouter;
