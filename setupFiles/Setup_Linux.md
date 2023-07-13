# Setup react-native on Linux

## Install dependencies

### Install node

Follow the instructions to install node on your system (using [this link](https://nodejs.org/en/download/package-manager)).

### Install Java Development Kit (JDK)

You should use the version 11 of the JDK.

Follow the instructions to install JDK on your system (using [this link](https://www.oracle.com/java/technologies/javase-downloads.html)).

### Install Android Studio

Follow the instructions to install Android Studio on your system (using [this link](https://developer.android.com/studio/index.html)).

While on the Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device

Then, click "Next" to install all of these components.

Once Android Studio is installed, you'll have to install the Android SDK.

#### Install Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 13 (Tiramisu) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "Configure" and select "SDK Manager".

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 13 (Tiramisu) entry, then make sure the following items are all checked:

- Android SDK Platform 13
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 33.0.0 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#### Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your `$HOME/.bash_profile` or `$HOME/.bashrc` config file:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Setup your Android environment

Before building your project, you need to setup your Android environment.

Create the file `android/local.properties`in NoLoApp with this content:

```bash
sdk.dir = /home/USERNAME/Android/Sdk
```

Where

### Install watchman

Follow these instructions to install watchman on your system (using [this link](https://facebook.github.io/watchman/docs/install/#linux)).

### Install react-native-cli

```bash
npm install -g react-native-cli
```

### Install yarn

```bash
npm install -g yarn
```

## Troubleshooting

If you encounter any errors please read the [official documentation](https://reactnative.dev/docs/environment-setup?guide=native&package-manager=yarn&os=linux&platform=android#Xcode)

And then contact @JohanCDev or by opening an issue on [Github](https://github.com/NoLoSay/NoLoApp/issues).
