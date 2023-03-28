/* global Module */

/* Magic Mirror
 * Module: MMM-Compliment-Sender
 *
 * By Sibling Riot
 * MIT Licensed.
 */

Module.register('MMM-Compliment-Sender', {
  defaults: {
    jsonFilePath: '/home/pi/MagicMirror/Connections/complimentsB.json',
    messageType: 'anytime'
  },

  start: function () {
    Log.info('MMM-MyKeyboardModule started');
    this.sendSocketNotification('LOAD_JSON_DATA');
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = "Type a message:";
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "messageInput");
    input.setAttribute("maxlength", "50");
    input.setAttribute("placeholder", "Type your message here");
    wrapper.appendChild(input);
    var button = document.createElement("button");
    button.innerHTML = "Send";
    button.addEventListener("click", () => {
      var message = input.value.trim();
      if (message.length > 0) {
        this.sendSocketNotification('SAVE_MESSAGE', { type: this.config.messageType, message: message });
        input.value = '';
      }
    });
    wrapper.appendChild(button);
    return wrapper;
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'JSON_DATA_LOADED') {
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
