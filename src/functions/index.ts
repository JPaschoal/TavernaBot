import { Streams } from "Types/Streams.js";

const BASE_URL = "https://api.twitch.tv/helix";

export const getOAuthToken = async () => {
  const url = "https://id.twitch.tv/oauth2/token?client_id=" + process.env.TWITCH_CLIENT_ID + "&client_secret=" + process.env.TWITCH_CLIENT_SECRET + "&grant_type=client_credentials";
  const response = await fetch(url, { method: "POST" });
  const json = await response.json() as { access_token: string };
  return json.access_token;
};

export const getStream = async (token: string) => {
  const url = `${BASE_URL}/streams?user_login=forgetfulxx`;
  const response = await fetch(url, {
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID || "",
      "Authorization": `Bearer ${token}`
    }});
  const json: Streams = await response.json() as Streams;
  return json;
};

export const getVideos = async (token: string) => {
  const url =  `${BASE_URL}/videos?user_id=467921305&type=archive`;
  const response = await fetch(url, {
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID || "",
      "Authorization": `Bearer ${token}`
    }});
  const json = await response.json() as Videos;
  return json;
};