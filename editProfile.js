const cc = require('./controllers/communicateController');

/**
 * 
 * @param {string} name 
 * @returns edit profile page
 */
function createEditProfile(name) {
    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "contentContainerWidth": "narrow",
        "content": [
            {
                "elementType": "form",
                "id": "profile_form",
                "relativePath": "./editProfile",
                "items": [
                    {
                        "elementType": "formInputText",
                        "name": "major",
                        "label": "Edit Major"
                    },
                    {
                        "elementType": "formInputTextarea",
                        "name": "aboutme",
                        "label": "Edit About Me"
                    }
                ],
                "buttons": [
                    {
                        "elementType": "formButton",
                        "name": "update",
                        "title": "Update",
                        "buttonType": "submit",
                        "actionStyle": "constructive",
                        "minWidth": "8rem",
                    }
                ]
            }
        ]
    };

    return xmJson;
}
module.exports.createEditProfile = createEditProfile;
