/* Magic Mirror
 * Node Helper: MMM-Compliment-Sender
 *
 * By Sibling Riot
 * MIT Licensed.
 */

const fs = require("fs");
const path = require("path");

const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function() {
    console.log("Starting node helper for module [" + this.name + "]");
  },

  readJsonFromFile: function(filepath) {
    const absolutePath = path.resolve(filepath);
    const jsonString = fs.readFileSync(absolutePath, "utf8");
    return JSON.parse(jsonString);
  },

  writeJsonToFile: function(filepath, data) {
    const absolutePath = path.resolve(filepath);
    const jsonString = JSON.stringify(data);
    fs.writeFileSync(absolutePath, jsonString, "utf8");
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "WRITE_JSON_TO_FILE") {
      this.writeJsonToFile(payload.filepath, payload.data);
    } else if (notification === "READ_JSON_FROM_FILE") {
      const data = this.readJsonFromFile(payload.filepath);
      this.sendSocketNotification("JSON_DATA", data);
    }
  }
});
