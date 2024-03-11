const utility = require('../utility');

const jobsRoutes = (app, fs, filePath) => {
  
    app.get('/jobs', (req, res) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });

    app.get('/jobs/:id', (req, res) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        const jobId = req.params['id'];
        const jobsPayload = JSON.parse(data);
        const getJobById = utility.getById(jobsPayload?.jobs, jobId) || {};
        
        res.send(getJobById);
      });
    });
  };
  
  module.exports = jobsRoutes;