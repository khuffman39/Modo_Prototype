const cc = require('./controllers/communicateController');
const data = require('./data/checklistData.json');

/**
 * 
 * @param {string} name 
 * @param {array} values 
 * @returns screen user sees after submitting checklist and updates checklist values
 */
async function updateChecklist(name, values) {
    cc.updateUserChecklist(name, values);

    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "content": [
            {
                "elementType": "blockHeading",
                "heading": "Your checklist has been updated",
                "description": "Thank you for your submission"
            },
            {
                "elementType": "linkButton",
                "backgroundColor": "#00baff",
                "borderColor": "#00baff",
                "borderWidth": "2px",
                "title": "Home",
                "textColor": "#000000",
                "link": {
                    "relativePath": "./hello"
                }
            }
        ]
    };

    return xmJson;
};
module.exports.updateChecklist = updateChecklist;

/**
 * 
 * @param {string} name 
 * @returns checklist page
 */
async function createChecklist(name) {    
    let me = await cc.getUserInfo(name);
    let totalTasks = 10;
    let completed = null;
    console.log("ME", me.attributes.checklist);
    for (let task in me.attributes.checklist) {
        console.log("TASK", task);
        completed = completed + 1;
    }
    let available = totalTasks - completed;
    
    let xmJson = {
        "metadata": {
            "version": "2.0"
        },
        "contentContainerWidth": "narrow",
        "content": [
            {
                "elementType": "divider",
                "borderColor": "transparent"
            },
            {
                "elementType": "availability",
                "id": "available_inuse",
                "availableNumber": completed,
                "availableLabel": "Completed",
                "busyNumber": available,
                "busyLabel": "To Do",
                "marginTop": "none",
                "marginBottom": "medium"
            },
            {
                "elementType": "form",
                "id": "checkbox",
                "relativePath": "./checklist",
                "items": [
                    {
                        "elementType": "formInputCheckboxGroup",
                        "name": "beforeJuly",
                        "label": "",
                        "description": "Check all that apply",
                        "options": {
                            "payEnrollmentFee": "Pay your enrollment fee",
                            "acceptFinAid": "Accept your financial aid package (if applicable)",
                            "registerAdvising": "Register for an Academic Advising & Course Enrollment session",
                            "activateEmail": "Activate your SCU email account",
                            "housingDeposit": "Submit your housing deposit",
                            "submit_scores": "Submit your AP scores, IB credit, and University of Cambridge International exams",
                            "submitFerpa": "Submit the FERPA Release (if applicable)",
                            "calcReadiness": "Take the Calculus Readiness Exam",
                            "languagePlacement": "Take a Language Placement Exam",
                            "techSeries": "Complete the online Technology for Academic Success Series"
                        },
                        "optionDescriptions": {
                            "payEnrollmentFee": "To confirm enrollment at SCU, please pay the non-refundable $500 enrollment fee by logging in to the SCU Application Portal.",
                            "acceptFinAid": "If you are receiving financial aid from SCU, be sure to accept your financial aid package by logging in to your Workday portal by July 24",
                            "registerAdvising": "All new students beginning enrollment in September 2023 are required to register for an Academic Advising & Course Enrollment session but are automatically registered for all other parts of Orientation",
                            "activateEmail": "For students beginning enrollment in September 2023, SCU email accounts will be ready to activate starting May 1, 2023 for first year students",
                            "housingDeposit": "As a reminder, there is a residency requirement for first year students and sophomores",
                            "submit_scores": "Credit or placement is determined by the appropriate department based on review of the student's test scores, sometimes in the context of supplemental departmental examinations",
                            "submitFerpa": "For those students who do decide to sign the FERPA release form, many do so during the Fall Registration Checklist steps in their Workday portal",
                            "calcReadiness": "If you are required to take the CRE, it is your first session with ALEKS that counts",
                            "languagePlacement": "Language placement testing should ideally be completed 3 weeks prior to participating in your Academic Advising & Course Enrollment session",
                            "techSeries": "All new students will receive the instructions via email in early May for taking the course called Technology for Academic Success Series"
                        },
                        "value": "checklist" in me.attributes? me.attributes.checklist: []
                    }
                ],
                "buttons": [
                    {
                        "elementType": "formButton",
                        "name": "s1_submit",
                        "title": "Submit",
                        "buttonType": "submit",
                        "actionStyle": "constructive",
                        "minWidth": "8rem"
                    }
                ]
            }
        ]
    }
    
    console.log(JSON.stringify(xmJson));
    return xmJson;
;}
module.exports.createChecklist = createChecklist;

