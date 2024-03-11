const utility = require('../utility');

const classificationsRoutes = (app, fs, filePath) => {
  
    app.get('/categories', (req, res) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });

    app.get('/categories/:id', (req, res) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        const categoryId = req.params['id'];
        const categoriesPayload = JSON.parse(data);
        const getCategoryById = utility.getById(categoriesPayload?.classifications, categoryId) || {};
        
        res.send(getCategoryById);
      });
    });
  };
  
  module.exports = classificationsRoutes;