/**
 * api.js
 * Connects to the same Node.js backend used by the web app.
 *
 * IMPORTANT: Change BASE_URL to your machine's local IP when testing on a
 * physical Android device. You cannot use localhost from a real device.
 *
 * How to find your IP:
 *   Windows  →  run: ipconfig        (look for IPv4 Address)
 *   Mac/Linux → run: ifconfig        (look for inet on en0/wlan0)
 *
 * Examples:
 *   Android Studio emulator  →  http://10.0.2.2:3001
 *   Physical phone (WiFi)    →  http://192.168.1.xx:3001
 *   Expo Go on same machine  →  http://localhost:3001
 */

import axios from "axios";
import Constants from "expo-constants";

// For APK builds, hostUri is often unavailable. Prefer explicit config first.
const configuredBaseUrl =
  Constants.expoConfig?.extra?.apiBaseUrl || process.env.EXPO_PUBLIC_API_BASE_URL;
const host = Constants.expoConfig?.hostUri?.split(":").shift();
const fallbackLanBaseUrl = "http://192.168.0.4:3001";
const BASE_URL = configuredBaseUrl || (host ? `http://${host}:3001` : fallbackLanBaseUrl);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Analyze sentimen
export async function analyzeSentiment(text) {
  const response = await api.post("/api/analyze", { text });
  return response.data.data;
}

// Get history
export async function getHistory() {
  const response = await api.get("/api/history");
  return response.data.data;
}

// Clear history
export async function clearHistory() {
  await api.delete("/api/history");
}

export { BASE_URL };
