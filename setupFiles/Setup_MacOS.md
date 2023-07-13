# Setup react-native on MacOS

## Install dependencies

First of all we recommend you to use brew to install all these dependencies.

### Install brew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install Xcode

If you have already installed Xcode on your system, make sure it is `version 10` or newer.

Install the latest stable version of Xcode (using [this link](https://apps.apple.com/us/app/xcode/id497799835?mt=12)).

Once Xcode is installed, you'll have to install the Command Line Tools.

```bash
xcode-select --install
```

### Install node

If you have already installed Node on your system, make sure it is `Node 16` or newer.

```bash
brew install node
```

### Install watchman

```bash
brew install watchman
```

### Install Java Development Kit (JDK)

We recommend installing the OpenJDK distribution called Azul Zulu.

```bash
brew tap homebrew/cask-versions
brew install --cask zulu11
# Get path to where cask was installed to double-click installer
brew info --cask zulu11
```

After you install the JDK, update your JAVA_HOME environment variable. If you used above steps, JDK will likely be at /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home

The Zulu OpenJDK distribution offers JDKs for both Intel and M1 Macs. This will make sure your builds are faster on M1 Macs compared to using an Intel-based JDK.

If you have already installed JDK on your system, we recommend JDK 11. You may encounter problems using higher JDK versions.

### Install Android Studio

Follow the instructions to install Android Studio on your system (using [this link](https://developer.android.com/studio/index.html)).
While on the Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device

Then, click "Next" to install all of these components.

#### Install Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 13 (Tiramisu) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "More Actions" and select "SDK Manager".

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 13 (Tiramisu) entry, then make sure the following items are all checked:

- Android SDK Platform 13
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 33.0.0 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#### Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your `~/.zprofile` or `~/.zshrc` (if you are using bash, then `~/.bash_profile` or `~/.bashrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Please make sure you use the correct Android SDK path. You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

### Install react-native-cli

```bash
npm install -g react-native-cli
```

### Install yarn

```bash
brew install yarn
```

### Setup your Android environment

Before building your project, you need to setup your Android environment.

Create the file `android/local.properties`in NoLoApp with this content:

```bash
sdk.dir = /Users/USERNAME/Library/Android/sdk
```

Replace `USERNAME` with your username.

## Troubleshooting

If you encounter any errors please read the [official documentation](https://reactnative.dev/docs/environment-setup?guide=native&package-manager=yarn#Xcode)

And then contact @JohanCDev or by opening an issue on [Github](https://github.com/NoLoSay/NoLoApp/issues).
