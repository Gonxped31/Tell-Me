export default {
    "expo": {
      "name": "frontend_app",
      "slug": "frontend_app",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/images/icon.png",
      "scheme": "myapp",
      "userInterfaceStyle": "automatic",
      "newArchEnabled": true,
      "ios": {
        "supportsTablet": true
      },
      "android": {
        "adaptiveIcon": {
          "foregroundImage": "./assets/images/adaptive-icon.png",
          "backgroundColor": "#ffffff"
        },
        "package": "com.anonymous.frontend_app"
      },
      "web": {
        "bundler": "metro",
        "output": "static",
        "favicon": "./assets/images/favicon.png"
      },
      "plugins": [
        "expo-router",
        [
          "expo-splash-screen",
          {
            "image": "./assets/images/splash-icon.png",
            "imageWidth": 200,
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
          }
        ]
      ],
      "experiments": {
        "typedRoutes": true
      }
    }
  }
  