/**
 * creates 3 tabs for students to view news, events, and clubs
 */
const news = require('./news.json');
const ac = require('./controllers/airtableController');
const cc = require('./controllers/calendarController');
let xmCarousel = [];
let eventName = null;
let time = null;
let location = null;
let xmClubItems = [];
let title = null;
let grad = null;
let repeat = "no"

async function createClubs(filter) {
    let clubs = await ac.getClubInfo();

   for (let i = 0; i < clubs.length; i++) {
        for (let j = 0; j < filter.length; j++) {
            title = clubs[i].fields.Name;
            grad = clubs[i].fields["Undergraduate or Graduate"];
            relaxed = clubs[i].fields["Relaxed <-> Serious"];
            background = clubs[i].fields["Academic Background"];
            if (filter[j] == null || filter[j] == 'none' || grad.includes(filter[j]) || relaxed.includes(filter[j]) || background.includes(filter[j])) {
                for (let k = 0; k < xmClubItems.length; k++) {
                    if (xmClubItems[k].title == title) {
                        repeat = "yes"
                    }
                }
                if (repeat != "yes") {
                    xmClubItems.push({
                        "elementType": "contentCard",
                        "textblockMargin": "tight",
                        "title": title,
                        "description": `<br>Undergraduate or Graduate | ${clubs[i].fields["Undergraduate or Graduate"]} <br><br> Relaxed <-> Serious | ${clubs[i].fields["Relaxed <-> Serious"]} <br><br> Academic Background | ${clubs[i].fields["Academic Background"]}`,
                        "imageStyle": "hero",
                        "link": {
                            "relativePath": "./viewClub/" + title
                        }
                    })
                }
                repeat = "no"
            }
        }
   }
}
module.exports.createClubs = createClubs;

/**
 * 
 * @param {string} selectedDate 
 * @returns event items array
 */
async function getEvents(selectedDate) {
    let dividerColor = "#68973f";
    let xmEventItems = [];
    let newDate = selectedDate.toString(); 

    let events = await cc.getEventInfo();

    let updatedDate = null; //reformatted date in month day
    let month = 0;
    let currentMonth = 0;
    let count = 0;
    let currentDate = new Date();
 
    currentDate = currentDate.toString()

    if (currentDate.slice(4,7) == 'Jan') {
        currentMonth = 1
    }
    else if (currentDate.slice(4,7) == 'Feb') {
        currentMonth = 2
    }
    else if (currentDate.slice(4,7) == 'Mar') {
        currentMonth = 3
    }
    else if (currentDate.slice(4,7) == 'Apr') {
        currentMonth = 4
    }
    else if (currentDate.slice(4,7) == 'May') {
        currentMonth = 5
    }
    else if (currentDate.slice(4,7) == 'Jun') {
        currentMonth = 6
    }
    else if (currentDate.slice(4,7) == 'Jul') {
        currentMonth = 7
    }
    else if (currentDate.slice(4,7) == 'Aug') {
        currentMonth = 8
    }
    else if (currentDate.slice(4,7) == 'Sep') {
        currentMonth = 9
    }
    else if (currentDate.slice(4,7) == 'Oct') {
        currentMonth = 10
    }
    else if (currentDate.slice(4,7) == 'Nov') {
        currentMonth = 11
    }
    else if (currentDate.slice(4,7) == 'Dec') {
        currentMonth = 12
    }
   
    for (let i = 0; i < events.length; i++) {
        count = count + 1;
        date = events[i].fields.Date;
        for (let i = 0; i < 11; i++) {
            if (date.slice(5,7) == '01') {
                updatedDate = `Jan ${date.slice(8,10)}`
                month = 1
            }
            else if (date.slice(5,7) == '02') {
                updatedDate = `Feb ${date.slice(8,10)}`
                month = 2
            }
            else if (date.slice(5,7) == '03') {
                updatedDate = `Mar ${date.slice(8,10)}`
                month = 3
            }
            else if (date.slice(5,7) == '04') {
                updatedDate = `Apr ${date.slice(8,10)}`
                month = 4
            }
            else if (date.slice(5,7) == '05') {
                updatedDate = `May ${date.slice(8,10)}`
                month = 5
            }
            else if (date.slice(5,7) == '06') {
                updatedDate = `June ${date.slice(8,10)}`
                month = 6
            }
            else if (date.slice(5,7) == '07') {
                updatedDate = `Jul ${date.slice(8,10)}`
                month = 7
            }
            else if (date.slice(5,7) == '08') {
                updatedDate = `Aug ${date.slice(8,10)}`
                month = 8
            }
            else if (date.slice(5,7) == '09') {
                updatedDate = `Sep ${date.slice(8,10)}`
                month = 9
            }
            else if (date.slice(5,7) == '10') {
                updatedDate = `Oct ${date.slice(8,10)}`
                month = 10
            }
            else if (date.slice(5,7) == '11') {
                updatedDate = `Nov ${date.slice(8,10)}`
                month = 11
            }
            else if (date.slice(5,7) == '12') {
                updatedDate = `Dec ${date.slice(8,10)}`
                month = 12
            }
        }
        if (events[i].fields.Tags[0] == "Cultural") {
            dividerColor = "#e05a35"
        }
        else if (events[i].fields.Tags[0] == "Arts") {
            dividerColor = "#108DE0"
        }
        else if (events[i].fields.Tags[0] == "STEM") {
            dividerColor = "#fcf403"
        }
        else if (events[i].fields.Tags[0] == "ASG") {
            dividerColor = "#68973f"
        }

        if (newDate.includes(updatedDate)) {
            time = events[i].fields.Time;
            eventName = events[i].fields.Name;
            location = events[i].fields.Location;
            description = events[i].fields.Description
            xmEventItems.push({
                "datetimePrimaryLine": updatedDate,
                "datetimeSecondaryLine": time,
                "title": eventName,
                "description": location,
                "dividerColor": dividerColor,
                "link": {
                    "relativePath": "./viewEvent/" + eventName
                }
            })
        }
        //determine how many cards will be displayed in the Center tab
        if (count <= 5 && month >= currentMonth) {
            xmCarousel.push({
                "elementType": "carouselCardItem",
                "title": events[i].fields.Name,
                "description": `${updatedDate} | ${events[i].fields.Time} | ${events[i].fields.Location}<br><br>${events[i].fields.Description}`,
                "link": {
                    "relativePath": "./viewEvent/" + events[i].fields.Name
                }
            })
        }
   }
   console.log(xmEventItems);
   return xmEventItems;
}
module.exports.getEvents = getEvents;


async function getInfoByAjax(selectedDate) {
    newSelectedDate = new Date (selectedDate);
    //console.log("new selected date", newSelectedDate);
    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "elementFields": {
            "items": await getEvents(newSelectedDate)
        }
    };
    return xmJson;
}
module.exports.getInfoByAjax = getInfoByAjax;

/**
 * 
 * @returns student center page json
 */
async function createPortal() {
    let clubs = await ac.getClubInfo();

    //Default student center screen
    let xmCenter = {
        "elementType": "cardSet",
        "id": "carousel_text",
        "marginTop": "xtight",
        "size": "large",
        "items": [{
            "elementType": "carouselCard",
            "heading": "Upcoming Events",
            "items": xmCarousel
         }]
    };

    let xmButton = {
        "elementType": "linkButton",
        "title": "Add a Club",
        "link": {
            "external": "https://airtable.com/appTu7jnbteV6oUJ5/shre9hai8twkKI1y9"
        }
    }
    //clubs tab section
    let xmClubs = {
        "elementType": "cardSet",
        "id": "club_items",
        "marginTop": "tight",
        "size": "medium",
        "items": xmClubItems
    }

    let xmFilter = {
        "elementType": "form",
        "id": "select",
        "relativePath": "./studentcenter",
        "items": [
            {
                "elementType": "formInputAssistedMultiselect",
                "name": "assisted_multiselect_grouped",
                "label": "Filter Clubs",
                "description": "Select one or more",
                "options": [
                    {
                        "label": "Show all",
                        "value": "none"
                    },
                    {
                        "label": "Undergrad or Grad",
                        "value": [{
                            "value": "Grad",
                            "label": "Grad"
                        },
                        {
                            "value": "Undergrad",
                            "label": "Undergrad"
                        }]
                    },
                    {
                        "label": " Relaxed <-> Serious",
                        "value": [{
                            "value": "⚪️⚪️⚪️⚪️🔵",
                            "label": "⚪️⚪️⚪️⚪️🔵",
                        },
                        {
                            "value": "⚪️⚪️⚪️🔵⚪️",
                            "label": "⚪️⚪️⚪️🔵⚪️",
                        },
                        {
                            "value": "⚪️⚪️🔵⚪️⚪️",
                            "label": "⚪️⚪️🔵⚪️⚪️",
                        },
                        {
                            "value": "⚪️🔵⚪️⚪️⚪️",
                            "label": "⚪️🔵⚪️⚪️⚪️",
                        },
                        {
                            "value": "🔵⚪️⚪️⚪️⚪️",
                            "label": "🔵⚪️⚪️⚪️⚪️",
                        }]
                },
                {
                    "label": "Background",
                    "value": [
                        {
                            "value": "Any Background",
                            "label": "Any Background"
                        },
                        {
                            "value": "Science and Engineering",
                            "label": "Science and Engineering"
                        },
                        {
                            "value": "Arts and Design",
                            "label": "Arts and Design"
                        },

                    ]
                }
            ],
            "events": [
                {
                    "eventName": "change",
                    "action": "ajaxUpdate",
                    "targetId": "club_items",
                    "ajaxRelativePath": "",
                    "propagateArgs": true
                }
            ]
        },
        {
            "elementType": "formButton",
            "name": "filterSubmit",
            "actionStyle": "constructive",
            "title": "Filter",
            "buttonType": "submit",
            "minWidth": "4rem"
        }
    ]
};

    let xmSearch = {
        "elementType": "form",
        "id": "search",
        "items": [
            {
                "elementType": "formInputSearch",
                "name": "search",
                "label": "Search",
                "placeholder": "Search by name or title"
            }
        ]
    }


   let currentDate = new Date();
   //console.log("DATE", currentDate);

    let xmEventsTab = [
        {
            "elementType": "divider",
            "borderColor": "transparent"
        },
        {
            "elementType": "dropdownCalendarPicker",
            "id": "dailyschedule",
            "showSelectedDate": true,
            "selectedDateFormat": "long",
            "events": [
                {
                    "eventName": "changed",
                    "action": "ajaxUpdate",
                    "targetId": "eventList",
                    "ajaxRelativePath": "./studentCenter/ajax",
                    "propagateArgs": true
                    
                }
            ]
        },
        {
            "elementType": "linkButton",
            "actionStyle": "link",
            "textColor": "theme:primary_text_color",
            "title": "Previous",
            "icon": "previous",
            "iconPosition": "iconOnly",
            "events": [
                {
                    "eventName": "click",
                    "action": "previousDate",
                    "targetId": "dailyschedule"
                }
            ]
        },
        {
            "elementType": "linkButton",
            "actionStyle": "link",
            "textColor": "theme:primary_text_color",
            "title": "Next",
            "icon": "next",
            "iconPosition": "iconOnly",
            "disabled": false,
            "events": [
                {
                    "eventName": "click",
                    "action": "nextDate",
                    "targetId": "dailyschedule"
                }
            ]
        },
        {
            "elementType": "divider",
            "borderColor": "transparent"
        },
        {
            "elementType": "eventList",
            "id": "eventList",
            "titleLineClamp": 2,
            "descriptionLineClamp": 2,
            "showTopBorder": false,
            "showBottomBorder": false,
            "marginBottom": "none",
            "items": await getEvents(new Date())
        }
    ];

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "content": [
            {
                "elementType": "container",
                "id": "tab_styles",
                "content": [
                    {
                        "elementType": "blockHeading",
                        "headingLevel": 4,
                        "marginBottom": "none",
                        "headingTextColor": "gray"
                    },
                    {
                        "elementType": "tabs",
                        "tabStyle": "folder",
                        "tabs": [
                            {
                                "title": "Center",
                                "content": [xmCenter]
                            },
                            {
                                "title": "Events",
                                "content": xmEventsTab
                            },
                            {
                                "title": "Clubs",
                                "content": [xmFilter, xmClubs, xmButton]
                            }
                        ]
                    }
                ]
            }
        ]
    }
    xmClubItems = [];
    return xmJson;
};
module.exports.createPortal = createPortal;