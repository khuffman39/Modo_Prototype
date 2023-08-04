const cc = require('./controllers/communicateController');
const data = require('./data/studentData.json');
const ep = require('./editProfile');
const vp = require('./viewProfile');
let xmNameTags = null;

/**
 * 
 * @param {string} name 
 * @returns directory json within "Community" button
 */
async function createDirectory(name) {
    let me = await cc.getUserInfo(name);

    xmNameTags = [];

    xmNameTags.push(
        {
            "elementType": "blockHeading",
            "marginTop": "1rem",
            "heading": "Class of 2027",
            "headingFontSize": "1.5rem"
        },
        {
        "elementType": "nameTag",
        "id": "nameTag",
        "name": me.attributes.name,
        "description": me.attributes.major,
        "nickname": me.attributes.email,
        "image": {
            "url": me.attributes.photoURL,
            "alt": "Photo of Jonathan Surasmith"
        },
        "accessoryButton": {
            "actionStyle": "normal",
            "title": " Edit Profile ",
            "textColor": "theme:focal_link_color",
            "link": {
                "relativePath": "./editProfile"
            }
        }
    })

    for (let i = 0; i < data.length; i++) {
        let student = await cc.getUserInfo(data[i].id);
        if (student.id != name) {
            xmNameTags.push({
                "elementType": "nameTag",
                "id": "standard",
                "name": student.attributes.name,
                "description": student.attributes.major,
                "nickname": student.attributes.email,
                "image": {
                    "url": student.attributes.photoURL,
                    "alt": "Photo of Jonathan Surasmith"
                },
                "accessoryButton": {
                    "actionStyle": "normal",
                    "title": " Profile ",
                    "textColor": "theme:focal_link_color",
                    "link": {
                        "relativePath": "./viewProfile/" + student.id
                    }
                }
            })
        }
    }

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "contentContainerWidth": "narrow",
        "content": [
            {
            "elementType": "container",
            "id": "tab_styles",
            "content": xmNameTags
        }]
    };

    console.log("USER INFO", cc.getUsers);
    return xmJson;
}
module.exports.createDirectory = createDirectory;
