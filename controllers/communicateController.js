const axios = require('axios');
const baseUrl = 'https://communicate.modolabs.net/api/applications/kayla-sb/test/recipients/';

let config = {
    //method: 'get',
    maxBodyLength: Infinity,
    headers: { 
      'Accept': 'application/vnd.modo.communicate.v2', 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6ImViNGJiNmUwLTIwYjUtNDEwMy04MTdiLWRjOWVjZDJlMTUyMyJ9.eyJpc3MiOiJjb21tdW5pY2F0ZSIsImF1ZCI6ImNvbW11bmljYXRlIiwianRpIjoiZWI0YmI2ZTAtMjBiNS00MTAzLTgxN2ItZGM5ZWNkMmUxNTIzIiwiaWF0IjoxNjg4Mzk1OTE4LCJuYmYiOjE2ODgzNjc2MDAsInN1YiI6ImtheWxhLXNiIiwic2NvcGVzIjpbInJlY2lwaWVudF9zY2hlbWFzX21hbmFnZSIsInJlY2lwaWVudF9zY2hlbWFzX3ZpZXciLCJyZWNpcGllbnRzX2NyZWF0ZSIsInJlY2lwaWVudHNfZGVsZXRlIiwicmVjaXBpZW50c192aWV3Il0sInRhcmdldHMiOlsidGVzdCJdLCJjaGFubmVscyI6W10sImFsbF9jaGFubmVscyI6dHJ1ZSwiYWxsX3ByaXZpbGVnZWRfcmVjaXBpZW50X2F0dHJpYnV0ZXMiOnRydWUsImFsbG93ZWRfcHJpdmlsZWdlZF9yZWNpcGllbnRfYXR0cmlidXRlcyI6WyIiXSwiZXhwIjoxNzE5OTMxOTE4fQ.gT6z72jY5hcBuy7JniPgRev9-GMsPJj0KY0cNcwI-Gg'
    }
  };

/**
 * 
 * @returns all users and their data
 */
async function getUsers() {
    config.method = 'get';
    let rslts = await axios(config);
    //console.log("Student Data", JSON.stringify(rslts.data));
    return rslts.data;
}
module.exports.getUsers = getUsers;

/**
 * 
 * @param {string} id - user identifier for communicate directory
 * @returns all of the identified user's data
 */
async function getUserInfo(id) {
    config.method = 'get';
    config.url = baseUrl + id;
    let result = await axios(config);
    //console.log("Data", JSON.stringify(result.data));
    return result.data;
}
module.exports.getUserInfo = getUserInfo;

/**
 * 
 * @param {string} id - user identifier for communicate directory
 * @param {array} arrayOfTasks - array of updated completed tasks by user that checklist is set to
 */
async function updateUserChecklist(id, arrayOfTasks) {
    let data = JSON.stringify({
        "recipients": [
          {
            "id": id,
            "attributes": {
              "checklist": arrayOfTasks
            }
          }
        ]
    });
    config.url = baseUrl;
    config.method = 'patch';
    config.data = data;
    await axios(config);
}
module.exports.updateUserChecklist = updateUserChecklist;

async function updateUserInfo(id, major, aboutme) {
    console.log("MAJOR", major)
    console.log("ABOUT ME", aboutme)
    let data = JSON.stringify({
        "recipients": [
          {
            "id": id,
            "attributes": {
              "major": major,
              "aboutMe": aboutme
            }
          }
        ]
    });
    config.url = baseUrl;
    config.method = 'patch';
    config.data = data;
    await axios(config);
}
module.exports.updateUserInfo = updateUserInfo;

async function updateAboutMe(id, aboutme) {
    console.log("ABOUT ME", aboutme)
    let data = JSON.stringify({
        "recipients": [
          {
            "id": id,
            "attributes": {
              "aboutMe": aboutme
            }
          }
        ]
    });
    config.url = baseUrl;
    config.method = 'patch';
    config.data = data;
    await axios(config);
}
module.exports.updateAboutMe = updateAboutMe;

async function updateMajor(id, major) {
    console.log("MAJOR", major)
    let data = JSON.stringify({
        "recipients": [
          {
            "id": id,
            "attributes": {
              "major": major
            }
          }
        ]
    });
    config.url = baseUrl;
    config.method = 'patch';
    config.data = data;
    await axios(config);
}
module.exports.updateMajor = updateMajor;




