const ac = require('./controllers/airtableController');

/**
 * 
 * @param {string} title 
 * @returns club detail page
 */

async function viewClub(title) {
    let clubs = await ac.getClubInfo();
    let xmPage = null;
    for (let i = 0; i < clubs.length; i++) {
        if (title == clubs[i].fields.Name) {
            xmPage =
                {
                    "elementType": "detail",
                    "id": "buttons",
                    "title": clubs[i].fields.Name,
                    "byline": `Undergraduate or Graduate | ${clubs[i].fields["Undergraduate or Graduate"]} <br><br> Relaxed <-> Serious | ${clubs[i].fields["Relaxed <-> Serious"]} <br><br> Academic Background | ${clubs[i].fields["Academic Background"]} <br><br> Website | ${clubs[i].fields["Website"]} `,
                    "body": clubs[i].fields["About Us"],
                    "label": "Clubs",
                    "titleFontFamily": "Arial",
                    "bylineFontSize": "1rem",
                    "titleFontWeight": "bold",
                    "thumbnailSize": "large",
                    "thumbnailBorderRadius": "1rem"
                }
        }
    }

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
            xmPage
        ]
    };
    return xmJson;
}
module.exports.viewClub = viewClub;


