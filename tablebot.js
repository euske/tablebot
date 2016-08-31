var irc = require("irc");

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
   flip: function() {
     if(!table.flipped) {
        table.flipped = true;
        bot.say(config.channels[0], "(╯°□°）╯︵ ┻━┻");
     } else {
        table.flipped = false;
        bot.say(config.channels[0], "(╯°□°）╯︵ ┬─┬");
     }
   },
   restore: function() {
     if(table.flipped) {
        table.flipped = false;
        bot.say(config.channels[0], "┬─┬ノ(°_°ノ)");
     } else {
        bot.say(config.channels[0], "¯\\_(ツ)_/¯");
     }
   }
};

bot.addListener("message"+config.channels[0], function (from, message) {
   if(message.toLowerCase() === "flip") {
      table.flip();
   } else if(message.toLowerCase() === "restore") {
      table.restore();
   }
});

bot.addListener("error", function(message) {
   console.log("error: ", message);
});