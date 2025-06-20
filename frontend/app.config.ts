import 'dotenv/config';

export default {
    "expo": {
      "name": "Tell Me",
      "slug": "tell-me",
      "version": "0.1.0",
      "orientation": "portrait",
      "icon": "./src/assets/images/icon.png",
      "scheme": "myapp",
      "userInterfaceStyle": "automatic",
      "newArchEnabled": true,
      "ios": {
        "supportsTablet": true
      },
      "android": {
        "adaptiveIcon": {
          "foregroundImage": "./src/assets/images/adaptive-icon.png",
          "backgroundColor": "#ffffff"
        },
        "package": "com.anonymous.frontend_app"
      },
      "web": {
        "bundler": "metro",
        "output": "static",
        "favicon": "./src/assets/images/favicon.png"
      },
      "plugins": [
        "expo-router",
        [
          "expo-splash-screen",
          {
            "image": "./src/assets/images/splash-icon.png",
            "imageWidth": 200,
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
          }
        ]
      ],
      "experiments": {
        "typedRoutes": true
      },
      extra: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        databaseURL: process.env.DATABASE_URL,
        eas: {
          "projectId": "b2599488-da84-4711-9b1c-73c5fba73dcf"
        }
      }
    }
  }
  