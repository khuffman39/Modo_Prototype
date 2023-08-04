const cc = require('./controllers/calendarController');

/**
 * 
 * @param {string} event 
 * @returns event detail page 
 */
async function viewEvent(event) {
    let events = await cc.getEventInfo();
    let xmPage = null;

    for (let i = 0; i < events.length; i++) {
        if (event == events[i].fields.Name) {
            xmPage = {
                "elementType": "detail",
                "id": "buttons",
                "title": events[i].fields.Name,
                "byline": `Date | ${events[i].fields.Date} <br><br> Time | ${events[i].fields.Time} <br><br> Location | ${events[i].fields.Location}`,
                "body": events[i].fields.Description,
                "label": "Events",
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
module.exports.viewEvent = viewEvent;
