import { Event } from "#base";

new Event({
    name: "Moderation",
    event: "messageCreate",
    run(message) {
      console.log(message.content);
      if(!message.author.bot) {
        message.delete();
        return;
      }
    },
});