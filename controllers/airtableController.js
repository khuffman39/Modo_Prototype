const axios = require('axios');
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.airtable.com/v0/appTu7jnbteV6oUJ5/Table%201?maxRecords=15',
    headers: { 
      'Authorization': 'Bearer patjHngupa5QVKFv9.2deefef76e7778a9c6f33659e95ffcc4e6a67361f61874d3ef0b0d2a57542595', 
      'Cookie': 'brw=brwoJlvtSmYAnLZJV; AWSALB=K93COX7p6QXmb0gtu+VbpJEI9H5EuaunRfj1ckZSy/0mBuH+lhgoNAjTenRk/DUdePIWtaFGaFkSeqdjem/FAbzNpQu0k93uIq3rN18opVwq850Im6r9Lpb6MeSX; AWSALBCORS=K93COX7p6QXmb0gtu+VbpJEI9H5EuaunRfj1ckZSy/0mBuH+lhgoNAjTenRk/DUdePIWtaFGaFkSeqdjem/FAbzNpQu0k93uIq3rN18opVwq850Im6r9Lpb6MeSX'
    },
  };
/**
 * 
 * @returns all club information
 */
async function getClubInfo() {
    let result = await axios(config);
    return result.data.records;
}
module.exports.getClubInfo = getClubInfo;