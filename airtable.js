var Airtable = require('airtable');
var base = new Airtable({apiKey: 'YOUR_SECRET_API_TOKEN'}).base('appTu7jnbteV6oUJ5');
const table = base('Table 1');
const getRecords = async () => {
    const records = table.select().firstPage();
    console.log(records);
}

const getRecordById = async () => {
    const record = await table.find();
    console.log(record);
}

const createRecord = async(fields) => {

}

createRecord({
    Name: "James."
})

getRecords();