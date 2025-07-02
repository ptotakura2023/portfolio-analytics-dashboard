import { logEvent } from "../services/api";

const eventTypes = ["click", "view", "scroll", "submit"];
const pages = ["home", "dashboard", "profile", "settings"];
const sources = ["web", "mobile", "api"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function simulateLoggingEvents(num = 50) {
  for (let i = 0; i < num; i++) {
    const event = {
      event_type: getRandomItem(eventTypes),
      page: getRandomItem(pages),
      source: getRandomItem(sources),
      timestamp: new Date().toISOString(),
    };

    try {
      await logEvent(event);
      console.log("Logged event:", event);
    } catch (error) {
      console.error("Failed to log event", error);
    }
  }
} 