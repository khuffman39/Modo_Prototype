const cc = require('./controllers/communicateController');
const data = require('./data/studentData.json');

/**
 * 
 * @param {string} profileName 
 * @returns new page with selected user's profile information
 */
async function viewProfile(profileName) {
    let xmPageView = [];
    let xmNameTags = []

    let student = await cc.getUserInfo(profileName);
    
    xmNameTags.push(
        {
            "elementType": "contentCard",
            "size": "large",
            "imageStyle": "thumbnail",
            "image": {
                "url": student.attributes.photoURL,
                "alt": "Photo by https://unsplash.com/@pbernardon"
            },
            "title": student.attributes.name,
            "description": student.attributes.aboutMe
        }
    )

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "contentContainerWidth": "wide",
        "content": [
            {
                "elementType": "divider",
                "borderColor": "transparent"
            },
            {
                "elementType": "cardSet",
                "id": "imageStyle_heroLarge",
                "marginTop": "medium",
                "items": xmNameTags
            }
        ]
    };
    return xmJson;
}
module.exports.viewProfile = viewProfile;
