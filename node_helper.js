/* Magic Mirror
 * Node Helper: MMM-Compliment-Sender
 *
 * By Sibling Riot
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const fs = require('fs');

module.exports = NodeHelper.create({
  start: function () {
    console.log('MMM-MyKeyboardModule helper started...');
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'LOAD_JSON_DATA') {
      this.loadJSONData(payload);
    } else if (notification === 'SAVE_MESSAGE') {
      this.saveMessage(payload);
    }
  },

  loadJSONData: function (payload) {
    var self = this;
    var filePath = payload.jsonFilePath;
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var jsonData = JSON.parse(data);
        self.sendSocketNotification('JSON_DATA_LOADED', jsonData);
      }
    });
  },

  saveMessage: function (payload) {
    var self = this;
    console.log(payload);
    var filePath = payload.jsonFilePath;
    var messageType = payload.type;
    var message = payload.message;
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var jsonData = JSON.parse(data);
        if (jsonData[messageType] === undefined) {
          jsonData[messageType] = [];
        }
        jsonData[messageType].push(message);
        fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Message saved: ' + message);
          }
        });
      }
    });
  }
});
