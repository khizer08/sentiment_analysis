# SentiScope Mobile — React Native (Expo)

Android APK version of the SentiScope NLP Sentiment Analysis app.
Same backend, same features — packaged as a native Android app.

---

## Quick Start (Expo Go — no build needed)

```bash
cd mobile
npm install
npm start
```
Scan the QR code with the **Expo Go** app (install from Play Store).

### Set your backend IP first!
Edit `src/services/api.js` — change `BASE_URL`:

| Scenario | URL to use |
|---|---|
| Android Studio emulator | `http://10.0.2.2:3001` ← default |
| Physical device (same WiFi) | `http://YOUR_PC_IP:3001` |
| Expo Go on same machine | `http://localhost:3001` |

Find your PC IP: Windows → `ipconfig` · Mac/Linux → `ifconfig`

---

## Build APK (EAS Cloud — easiest, free)

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Create a free account at https://expo.dev and log in
eas login

# 3. Link this project to your account (run from mobile/ folder)
eas init

# 4. Build the APK (takes ~10–15 min, no Android Studio needed)
eas build -p android --profile preview
```

Download the `.apk` from the link in the terminal output.
Install on any Android phone: Settings → Install Unknown Apps → allow your browser/file manager.

---

## Build APK (Android Studio — fully local)

```bash
# 1. Generate native android/ folder
npm install expo-dev-client
npx expo prebuild --platform android

# 2. Open Android Studio → File → Open → select mobile/android/
# 3. Build → Build Bundle(s)/APK(s) → Build APK(s)
# APK saved to: mobile/android/app/build/outputs/apk/debug/app-debug.apk

# 4. Install via ADB (USB debugging enabled on phone)
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Running the full project for demo

```bash
# Terminal 1 — Python NLP
pip install vaderSentiment textblob transformers torch
python ../python_service/nlp_service.py

# Terminal 2 — Node.js backend
cd ../backend && npm install && node server.js

# Terminal 3 — Web app (optional)
cd ../frontend && npm install && npm run dev

# Mobile — install APK on phone, connect to same WiFi as your laptop
```
