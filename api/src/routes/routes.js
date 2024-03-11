const businessRoutes = require('./businesses');
const classificationsRoutes = require('./classifications');
const locationsRoutes = require('./locations');
const jobsRoutes = require('./jobs');
const { JSON_PATH } = require("../../src/constant");

const { 
  BUSINESS_DATA_PATH,
  CLASSIFICATION_DATA_PATH,
  LOCATIONS_DATA_PATH,
  JOBS_DATA_PATH
} = JSON_PATH

const appRouter = (app, fs) => {
  businessRoutes(app, fs, BUSINESS_DATA_PATH);
  classificationsRoutes(app, fs, CLASSIFICATION_DATA_PATH);
  locationsRoutes(app, fs, LOCATIONS_DATA_PATH);
  jobsRoutes(app, fs, JOBS_DATA_PATH);
};

module.exports = appRouter;