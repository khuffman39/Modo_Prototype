//calendar airtable controller
const axios = require('axios');

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.airtable.com/v0/appTu7jnbteV6oUJ5/Table%202?maxRecords=10',
    headers: { 
      'Authorization': 'Bearer pat6KRVAXWuDO7FWH.723748d4bdf69c2e1e9a0287f951c64918b1c468c78973d29e02d670466ba8e4', 
      'Cookie': 'brw=brwoJlvtSmYAnLZJV; AWSALB=dDXz4YvE/XaT9wQi9DITCOgPBoVvRGehsKAN1UfqYlmnLNOBfrrPGnSMqpa4HIuVXIICIBogyVjuYtrc1h/+HA+LosRlzXJfqfyfr0co0qhZNdMKdcwc+F6Vlogs; AWSALBCORS=dDXz4YvE/XaT9wQi9DITCOgPBoVvRGehsKAN1UfqYlmnLNOBfrrPGnSMqpa4HIuVXIICIBogyVjuYtrc1h/+HA+LosRlzXJfqfyfr0co0qhZNdMKdcwc+F6Vlogs'
    }
};

/**
 * 
 * @returns all event data
 */

async function getEventInfo() {
  let result = await axios(config);
  console.log("Data", JSON.stringify(result.data.records[0]));
  return result.data.records;
} 
module.exports.getEventInfo = getEventInfo;