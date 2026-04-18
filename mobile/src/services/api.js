import axios from "axios";
import Constants from "expo-constants";

/**
 * BASE URL resolution strategy:
 * 1. Use ENV variable (best for production / APK)
 * 2. Use Expo host (for LAN dev with Expo Go)
 * 3. Fallback to local IP (manual dev fallback)
 */

// 🔥 1. Production / EAS / ENV (BEST)
const envBaseUrl =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  Constants.expoConfig?.extra?.apiBaseUrl;

// 🔥 2. Expo LAN (only works in dev)
const host = Constants.expoConfig?.hostUri?.split(":").shift();
const lanBaseUrl = host ? `http://${host}:3001` : null;

// 🔥 3. Manual fallback (your local IP)
const fallbackBaseUrl = "http://192.168.0.4:3001";

// ✅ Final selection priority
const BASE_URL = envBaseUrl || lanBaseUrl || fallbackBaseUrl;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Analyze sentiment
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