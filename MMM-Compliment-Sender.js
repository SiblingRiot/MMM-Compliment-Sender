/* global Module */

/* Magic Mirror
 * Module: MMM-Compliment-Sender
 *
 * By Sibling Riot
 * MIT Licensed.
 */
 
//import { MMM-Keyboard } from '/home/pi/MagicMirror/modules/MMM-Keyboard/MMM-Keyboard.js';
//const Keyboard = require("MMM-Keyboard");

Module.register('MMM-Compliment-Sender', {
  defaults: {
    jsonFilePath: '/home/pi/MagicMirror/Connections/complimentsB.json',
    messageType: 'anytime',
    useKeyboard: true
  },

  start: function () {
    Log.info('MMM-MyKeyboardModule started');
    this.sendSocketNotification('LOAD_JSON_DATA', {...this.defaults});
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = "Type a message:";
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "messageInput");
    input.setAttribute("maxlength", "50");
    input.setAttribute("placeholder", "Type your message here");
    var keyboardModule = document.createElement("script");
    /*keyboardModule.setAttribute("src", "/home/pi/MagicMirror/modules/MMM-Keyboard/MMM-Keyboard.js");
    document.body.appendChild(keyboardModule);
    keyboardModule.onload = function () {
      Keyboard.attach(input);
    };*/
    wrapper.appendChild(input);
    var button = document.createElement("button");
    button.innerHTML = "Send";
    button.addEventListener("click", () => {
      var message = input.value.trim();
      if (message.length > 0) {
        this.sendSocketNotification('SAVE_MESSAGE', { ...this.defaults, type: this.config.messageType, message: message });
        input.value = '';
      }
    });
    wrapper.appendChild(button);
    return wrapper;
  },
  
  openKeyboard: function () {
    console.log("MMM-Compliment-Sender opening keyboard");
    this.sendNotification("KEYBOARD", {key: "mmm-compliment-sender", style: "default"});
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SAVE_MESSAGE') {
      // do something with the loaded JSON data if needed
      const fs = require('fs');
      fs.readFile("complimentsB.json", (err, data) => {  // READ
        if (err) {
          return console.error(err);
      };

      var data = JSON.parse(data.toString());
      data.age = "23"; // MODIFY
      var writeData = fs.writeFile("complimentsB.json", JSON.stringify(data), (err, result) => {  // WRITE
          if (err) {
              return console.error(err);
          } else {
              console.log(result);
              console.log("Success");
          }
      });
  });
      }
    }
});
