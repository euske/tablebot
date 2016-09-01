var irc = require("irc");
var flipText = require("flip-text");

var config = {
   channels: ["#ludumdare"],
   server: "irc.afternet.org",
   botName: "tablebot"
};

var bot = new irc.Client(config.server, config.botName, {
   userName: "tablebot",
   realName: "T. Bot",
   channels: config.channels,
   autoRejoin: true,
   stripColors: true,
   floodProtection: true,
   floodProtectionDelay: 500
});

var table = {
   flipped: false,
   textFlipped: false,
   savedText: "",
   flip: function(channel) {
     if(!table.flipped) {
        table.flipped = true;
        bot.say(config.channels[channel], "(╯°□°）╯︵ ┻━┻");
     } else {
        table.flipped = false;
        bot.say(config.channels[channel], "(╯°□°）╯︵ ┬─┬");
     }
   },
   restore: function(channel) {
     if(table.flipped) {
        table.flipped = false;
        bot.say(config.channels[channel], "┬─┬ノ(°_°ノ");
     } else {
        if(table.textFlipped) {
          bot.say(config.channels[channel], "(╯°□°）╯︵ " + table.savedText);
          table.textFlipped = false;
        }
        else {
          bot.say(config.channels[channel], "¯\\_(ツ)_/¯");
        }
     }
   },
   flip_: function(channel, text) {
     if(table.textFlipped && text === table.savedText) {
       bot.say(config.channels[channel], "(╯°□°）╯︵ " + table.savedText);
       table.textFlipped = false;
     }
     else {
       bot.say(config.channels[channel], "(╯°□°）╯︵ " + flipText(text));
       table.textFlipped = true;
       table.savedText = text;
     }
   }
};

bot.addListener("message"+config.channels[0], function (from, message) {

   if(message.toLowerCase() === "flip") {
      table.flip(0);
   } else if(message.toLowerCase() === "restore") {
      table.restore(0);
   } else if(message.toLowerCase().substring(0, 5) === "flip ") {
      table.flip_(0, message.substring(5, message.length))
   }
});

bot.addListener("action", function (from, to, text, message) {
   if(config.channels[0] == message.args[0]) {
      if((text.toLowerCase()).indexOf("hugs tablebot") > -1 && message.user == "liamlime") {
         bot.action(config.channels[0], "hugs " + message.nick);
      }
   }
});

bot.addListener("error", function(message) {
   console.log("error: ", message);
});
