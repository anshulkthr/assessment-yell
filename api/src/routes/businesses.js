const { getById, getBusinessJobsById } = require('../utility');

const businessRoutes = (app, fs, filePath) => {
  
    app.get('/businesses', (req, res) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });

    app.get('/businesses/:id', (req, res) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        const businessId = req.params['id'];
        const businessesPayload = JSON.parse(data);
        const getBusinessById = getById(businessesPayload?.businesses, businessId) || {};
        
        res.send(getBusinessById);
      });
    });

    app.get('/businesses/:id/jobs', (req, res) => {
      fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
          throw err;
        }
        const businessId = req.params['id'];
        const businessesPayload = JSON.parse(data);
        const getBusinessDataWithJobsById = await getBusinessJobsById(businessesPayload?.businesses, businessId) || {};
        
        res.send(getBusinessDataWithJobsById);
      });
    });
  };
  
  module.exports = businessRoutes;