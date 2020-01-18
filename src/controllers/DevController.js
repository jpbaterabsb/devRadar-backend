const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../../websocket');
module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    const response = await axios.get(`https://api.github.com/users/${github_username}`);

    const { name = login, avatar_url, bio } = response.data;


    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      //Filtrar conexões maximo 10KM e msm stack
      
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      console.log(sendSocketMessageTo);

      sendMessage(sendSocketMessageTo, 'new-dev', dev);

    }
    return res.json(dev);
  },

  async index(req, res) {
    res.json(await Dev.find());
  }

}