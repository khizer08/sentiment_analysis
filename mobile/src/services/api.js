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

import axios from 'axios';

// ← CHANGE THIS to your machine's local IP if using a physical device
const BASE_URL = 'http://10.0.2.2:3001';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export async function analyzeSentiment(text) {
  const response = await api.post('/api/analyze', { text });
  return response.data.data;
}

export async function getHistory() {
  const response = await api.get('/api/history');
  return response.data.data;
}

export async function clearHistory() {
  await api.delete('/api/history');
}

export { BASE_URL };
