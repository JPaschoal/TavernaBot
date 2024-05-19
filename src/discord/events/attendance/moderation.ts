import { Event } from "#base";

new Event({
    name: "Moderation",
    event: "messageCreate",
    run(message) {
      if(message.channel.id !== "1241637598271901778") return;
      if(!message.author.bot) {
        message.delete();
        return;
      }
    },
});