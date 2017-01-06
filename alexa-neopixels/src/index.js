"use strict"
var APP_ID = 'amzn1.ask.skill.4ab717a5-516d-4235-81e0-86cd564f47a0';
var AlexaSkill = require('./AlexaSkill');
let SendColor = require("./sendColor");
let sendColor = new SendColor("unitt.org.uk/tree1")

var ChristmasLights = function () {
    AlexaSkill.call(this, APP_ID);
};

ChristmasLights.prototype = Object.create(AlexaSkill.prototype);
ChristmasLights.prototype.constructor = ChristmasLights;

ChristmasLights.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("ChristmasLights onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

ChristmasLights.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("ChristmasLights onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
};

ChristmasLights.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("ChristmasLights onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

ChristmasLights.prototype.intentHandlers = {
   "TurnOffIntent": function (intent, session, response) {
       let req = {"colour":"off"};
        var speechOutput = "Lights off.";
        sendColor.sendColor(req, () => {
            response.tellWithCard(speechOutput, "Christmas tree", speechOutput);
        });
   },
   "ChangeColorIntent": function (intent, session, response) {
       if(!intent.slots.LedColor || !intent.slots.LedColor.value ) {
            response.ask("Sorry I couldn't recognize that color.", "Sorry I couldn't recognize that color.");
            return;
       }

       let colorRequested = intent.slots.LedColor.value;
       let req = {"colour":colorRequested};
        var speechOutput = "OK, "+colorRequested+".";
        sendColor.sendColor(req, () => {
            response.tellWithCard(speechOutput, "Christmas tree", speechOutput);
        });
   },
    "ChangeIntensityIntent": function(intent, session, response) {
        if(!intent.slots.IntensityLevel || !intent.slots.IntensityLevel.value) {
            return response.ask("To what brightness? You say between 1 and 100 percent.", "To what brightness? You say between 1 and 100 percent.");
        }

        let intensity = intent.slots.IntensityLevel.value;
        var speechOutput = "Dimming to " + intensity + " percent.";

        var req = {"intensity": Number(intensity)};

        sendColor.sendIntensity(req, () => {
            response.tellWithCard(speechOutput, "Christmas tree", speechOutput);
        });
   },
   "AMAZON.HelpIntent": function (intent, session, response) {
        response.tell("You can ask me to set your lights to a colour. You can also ask me to set your lights' brightness or to turn them off.")
    }
};

exports.handler = function (event, context) {
    var instance = new ChristmasLights();
    instance.execute(event, context);
};
