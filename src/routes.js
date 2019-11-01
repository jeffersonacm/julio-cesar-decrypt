const express = require('express');
const SolutionController = require('../src/controller/SolutionController');
const routes = express.Router();

routes.get('/api/solution', SolutionController.receive);
routes.post('/api/solution', SolutionController.send);

module.exports = routes;