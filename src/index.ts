import { createClient } from "#base"; 

const client = createClient({
  commands: {
    guilds: ["375465460189364234"],
  }
});
client.start();