#Mo-Ho Locomoto Project
## Mock Apps to test features for Mo-Ho

The purpose of this apps is to test the features before we add it to the real apps.
All of the data is using mock data and solely for testing purpose

_Created using [ionic framework](http://ionicframework.com)._


### Setting up Ionic
Ionic has a super helpful CLI tools that you can install using npm.
```
npm install -g cordova ionic
```

Run this command to preview the application in your browser
```
ionic serve --lab
```

Some of the functionality that using ngCordova is not testable using web browser,
you need to setup your [ios](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide) /
[Android](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide) Device
to allow debuging on device, OR using ios / Android emulator.
```
ionic platform add [ios|android]
ionic build [ios|android]
```

### Installing Cordova Plugins

Module that we use in the prototype:
- Intro Pages using swipe gesture [ion Slide Box](http://ionicframework.com/docs/api/directive/ionSlideBox/), this one is part of ionic directive and not a cordova plugin.
- Native [Toast](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git) Notification
- [QR Code Reader](http://ngcordova.com/docs/#BarcodeScanner)
- [Tinder like UI](http://ionicframework.com/blog/tinder-for-x/) for Offer Approval, this ons too is not a cordova plugin, and you need to install it using bower.
- [Push Notification](http://ngcordova.com/docs/#Push) using AWS SNS
- Native [Social Sharing](http://ngcordova.com/docs/#SocialSharing) using Twitter Cards and device email client

If your build process broken and complining about the missing plugins, you can manually install the Cordova plugins using

```
cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
bower install ionic-contrib-tinder-cards
cordova plugin add https://github.com/phonegap-build/PushPlugin.git
cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
```

> **Notes:**
Sometimes Cordova plugin is not installed correctly, so you will need to uninstall and reinstall the platform
```
ionic platform rm [ios|android]
ionic platform add [ios|android]
```
