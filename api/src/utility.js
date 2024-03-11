const axios = require("axios");
const { BASE_URL } = require("./constant");
const fs = require('fs');

const getById = (payload, id) => {
    const paramsId = Number(id);
    const result = payload.find(data => {
        return data.id === paramsId;
    });
    
    return result;
}

const getAllJobs = async () => {
    const { data } =  await axios.get(`${BASE_URL}/jobs`);
    return data?.jobs || [];
}

const getAllCategories = async () => {
    const { data } =  await axios.get(`${BASE_URL}/categories`);
    return data?.classifications || [];
}

const getAllLocation = async () => {
    const { data } =  await axios.get(`${BASE_URL}/locations`);
    return data?.locations || [];
}

const transformJobsLocAndCateInVal = async (job) => {
    const allCategoriesData =  await getAllCategories();
    const allLocationsData = await getAllLocation();
    
    const categoryVal = allCategoriesData.find(category => {
        return category.id == job.classification;
    });

    const locationVal = allLocationsData.find(loaction => {
        return loaction.id == job.location;
    })

    job.classification = categoryVal.name;
    job.location = locationVal.name;

    return job;
}

const getJobsWithLocationAndCategoryValue = async (jobsData) => {
    const jobsWithLocAndCateVal = jobsData.map(async (jData) => {
        if (jData) {
            jData = await transformJobsLocAndCateInVal(jData);
            return { ...jData };
        }
        return jData;
    });

    return await Promise.all(jobsWithLocAndCateVal) || []
}

const getBusinessJobsById = async (payload, businessId) => {
    const businessData = getById(payload, businessId);
    const { id, username, display_name, classifications, locations_served } = businessData || {};
    const allJobsData =  await getAllJobs();
    
    const filterJobsByLocAndCategory = allJobsData?.filter(jobData => {
        return classifications?.includes(jobData.classification) && locations_served?.includes(jobData.location)
    })

    const mappedData = await getJobsWithLocationAndCategoryValue(filterJobsByLocAndCategory);

    const businessDataWithJobs = { 
        id,
        username,
        display_name,
        ...(mappedData.length > 0 && { jobs: mappedData })
    };

    

    return businessDataWithJobs || {};
}

module.exports = {
    getById,
    getBusinessJobsById
}