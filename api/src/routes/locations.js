const utility = require('../utility');

const locationsRoutes = (app, fs, filePath) => {
  
    app.get('/locations', (req, res) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });

    app.get('/locations/:id', (req, res) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        const locationId = req.params['id'];
        const locationsPayload = JSON.parse(data);
        const getLocationById = utility.getById(locationsPayload?.locations, locationId) || {};
        
        res.send(getLocationById);
      });
    });
  };
  
  module.exports = locationsRoutes;