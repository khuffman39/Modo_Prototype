// index.js
const serverless = require('serverless-http');
const express = require('express');
const auth = require('./authorizer.js');
const sc = require('./studentCenter.js');
const check = require('./checklist.js');
const cd = require('./classDirectory');
const ep = require('./editProfile');
const vp = require('./viewProfile');
const cc = require('./controllers/communicateController');
const ve = require('./viewEvent');
const vc = require('./viewClub');

let payload = null;
let name = null;
// instantiate the express server
const app = express();

// used to get post events as JSON objects correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(function (req, res, next) {
    payload = ('authorization' in req.headers && req.headers.authorization != null) ? auth.getPayload(req.headers.authorization) : null;
    if (payload != null && 'given_name' in payload) {
        res.locals.name = payload.given_name
    }
    next()
})


// TODO: Delete this function before you go live
app.get('/hello', function (req, res) {
    //console.log(req);

    //let payload = ('authorization' in req.headers && req.headers.authorization != null) ? auth.getPayload(req.headers.authorization) : null;
    console.log(JSON.stringify(payload));

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "content": [
            {
                "elementType": "container",
                "id": "example_arrangements",
                "content": [{
                    "elementType": "hero",
                    "height": "fluid",
                    "contentContainerWidth": "medium",
                    "backgroundImage": {
                        "url": "https://www.scu.edu/media/institutional-pages/admission/images/SCU-Fountain-Mission-Students-1156x419.png",
                        "overlayGradientStartColor": "rgba(0,0,0,0.9)",
                        "overlayGradientStartPosition": 33,
                        "overlayGradientAngle": 0
                    },
                    "content": [
                        {
                            "elementType": "heroButtons",
                            "marginTop": "3rem",
                            "horizontalAlignment": "center",
                            "marginBottom": "5rem",
                            "buttons": [
                                {
                                    "elementType": "linkButton",
                                    "backgroundColor": "#9d2235",
                                    "borderColor": "#9d2235",
                                    "borderWidth": "2px",
                                    "title": `Welcome, ${res.locals.name}`,
                                    "textColor": "#ffffff",
                                    "link": {
                                        "relativePath": "./editProfile"
                                    }
                                }
                            ]
                        }
                    ]
                }]
            },
            {
                "elementType": "divider",
                "borderColor": "transparent"
            },
            {
                "elementType": "grid",
                "id": "style_springboard",
                "gridStyle": "springboard",
                "marginBottom": "loose",
                "horizontalAlignment": "center",
                "items": [
                    {
                        "label": "My Checklist",
                        "link": {
                            "relativePath": "./checklist"
                        },
                        "image": {
                            "url": "https://static.modolabs.com/xmodule/iconsets/stroke-fullcolor/120/courses.png"
                        }
                    },
                    {
                        "label": "Community",
                        "link": {
                            "relativePath": "./classDirectory"
                        },
                        "image": {
                            "url": "https://static.modolabs.com/xmodule/iconsets/stroke-fullcolor/120/map.png"
                        }
                    },
                    {
                        "label": "Orientation",
                        "link": {
                            "relativePath": ""
                        },
                        "image": {
                            "url": "https://static.modolabs.com/xmodule/iconsets/stroke-fullcolor/120/computers.png"
                        }
                    }
                ]
            },
            {
                "elementType": "list",
                "itemSize": "medium",
                "listStyle": "separated",
                "backgroundColor": "#9d2235",
                "borderColor": "#9d2235",
                "items": [
                    {
                        "title": "Student Center",
                        "titleTextColor": "#ffffff",
                        "link": {
                            "relativePath": "./studentCenter"
                        }
                    },
                    {
                        "title": "Room Reservations",
                        "titleTextColor": "#ffffff",
                        "link": {
                            "relativePath": ""
                        }
                    },
                    {
                        "title": "Hours",
                        "titleTextColor": "#ffffff",
                        "link": {
                            "relativePath": ""
                        }
                    },
                    {
                        "title": "Campus Map",
                        "titleTextColor": "#ffffff",
                        "link": {
                            "relativePath": ""
                        }
                    }
                ]
            }
        ]
    }
    res.json(xmJson);
});


app.get('/studentcenter', async function(req, res) {
    let xmJson = await sc.createPortal();
    let filter = null;    
    res.json(xmJson);
});

app.post('/studentcenter', async function(req, res) {
    console.log("Entered post request")
    console.log("PRINTTT", req.body.assisted_multiselect_grouped)
    sc.createClubs(req.body.assisted_multiselect_grouped);

    let xmJson = {
        "metadata": {
            "version": "2.0"
        }
    };

    xmJson.metadata = {
        "version": "2.0",
        "redirectLink": {
            "relativePath": "./studentCenter"
        }
    };
    
    res.json(xmJson);
});

app.get('/studentCenter/ajax', async function(req, res) {
    console.log("Entered student center ajax");
    console.log("start date", req.query);
    let xmJson = await sc.getInfoByAjax(req.query.startdate);
    res.json(xmJson);
});

app.get('/viewClub/:title', async function(req, res) {
    console.log(req.params);
    //const name = res.locals.name.toLowerCase();
    let xmJson = await vc.viewClub(req.params.title);
    res.json(xmJson);
})


app.get('/viewEvent/:name', async function(req, res) {
    console.log(req.params);
    //const name = res.locals.name.toLowerCase();
    let xmJson = await ve.viewEvent(req.params.name);
    res.json(xmJson);
})

app.get('/checklist', async function(req, res) {
    const name = res.locals.name.toLowerCase();
    let xmJson = await check.createChecklist(name);
    res.json(xmJson);
})

app.post('/checklist', async function(req, res) {
    const name = res.locals.name.toLowerCase();
    let newValues = req.body.beforeJuly;
    console.log(res.locals.name);
    let xmJson = await check.updateChecklist(name, newValues);
    
    res.json(xmJson);
})

app.get('/viewProfile/:id', async function(req, res) {
    console.log(req.params);
    //const name = res.locals.name.toLowerCase();
    let xmJson = await vp.viewProfile(req.params.id);
    res.json(xmJson);
})

app.get('/editProfile', async function(req, res) {
    //console.log(req);
    const name = res.locals.name.toLowerCase();
    let xmJson = await ep.createEditProfile(name);
    res.json(xmJson);
})
    
app.post('/editProfile', async function(req, res) {
    let newMajor = null;
    let newAboutMe = null;
    let name = res.locals.name.toLowerCase()
    let xmJson = {
        "metadata": {
            "version": "2.0"
        }
    };

    console.log("REQUEST", req.body.major);

    if ('query' in req && req.body !== null && 'major' in req.body && 'aboutme' in req.body) {
        console.log("REQ BODY", req.body);
        newMajor = req.body.major;
        newAboutMe = req.body.aboutme;
        console.log("entered");
        if (newMajor == "" && newAboutMe != "") {
            await cc.updateAboutMe(name, newAboutMe)
        }
        else if (newAboutMe == "" && newMajor != "") {
            await cc.updateMajor(name, newMajor)
        }
        else if (newMajor != "" && newAboutMe != "") {
            await cc.updateUserInfo(name, newMajor, newAboutMe);
        }

        xmJson.metadata = {
            "version": "2.0",
            "redirectLink": {
                "relativePath": "./classDirectory"
            },
            "banners": [
                {
                    "message": "Profile Information Updated",
                    "type": "info"
                }
            ]
        };
    }
    res.json(xmJson);
})

app.get('/classDirectory', async function(req, res) {
    let name = res.locals.name.toLowerCase()
    let xmJson = await cd.createDirectory(name);
    res.json(xmJson);
})

module.exports.handler = serverless(app);
