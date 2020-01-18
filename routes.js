const {Router} = require('express');
const DevController = require('./src/controllers/DevController');
const SearchControlller = require('./src/controllers/SearchControlller');

const routes = Router();

routes.post('/devs', DevController.store);

routes.get('/devs', DevController.index);

routes.get('/search', SearchControlller.index);

module.exports = routes;