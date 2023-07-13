# Setup react-native on Linux

## Install dependencies

### Install node & OpenJDK

We recommend installing Node via [Chocolatey](https://chocolatey.org/), a popular package manager for Windows. If you use Chocolatey you can install Node by running the following command:

```bash
choco install -y nodejs-lts microsoft-openjdk11
```

If you have already installed Node on your system, make sure it is Node 16 or newer. If you already have a JDK on your system, we recommend JDK11. You may encounter problems using higher JDK versions.

### Install Java Development Kit (JDK)

You should use the version 11 of the JDK.

Follow the instructions to install JDK on your system (using [this link](https://www.oracle.com/java/technologies/javase-downloads.html)).

### Install Android Studio

Follow the instructions to install Android Studio on your system (using [this link](https://developer.android.com/studio/index.html)).

While on the Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device
- If you are not already using Hyper-V: Performance (Intel ®HAXM)

Then, click "Next" to install all of these components.

Once Android Studio is installed, you'll have to install the Android SDK.

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

- Open the Windows Control Panel.
- Click on User Accounts, then click User Accounts again
- Click on Change my environment variables

Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK:

```bash
C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
```

The SDK is installed, by default, at the following location:

```bash
%LOCALAPPDATA%\Android\Sdk
```

You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Open a new Command Prompt window to ensure the new environment variable is loaded before proceeding to the next step.

Open powershell
Copy and paste `Get-ChildItem -Path Env:\` into powershell
Verify `ANDROID_HOME` has been added

#### Add platform-tools to Path

Open the Windows Control Panel.

Click on User Accounts, then click User Accounts again

Click on Change my environment variables

Select the Path variable.

Click Edit.

Click New and add the path to platform-tools to the list.

The default location for this folder is:

```bash
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

#### Setup your Android environment

Before building your project, you need to setup your Android environment.

Create the file `android/local.properties`in NoLoApp with this content:

```bash
sdk.dir = C:\\Users\\USERNAME\\AppData\\Local\\Android\\sdk
```

Where `USERNAME` is your Windows username.

### Install react-native-cli

```bash
npm install -g react-native-cli
```

## Troubleshooting

If you encounter any errors please read the [official documentation](https://reactnative.dev/docs/environment-setup?guide=native&package-manager=yarn&os=windows&platform=android#Xcode)

And then contact @JohanCDev or by opening an issue on [Github](https://github.com/NoLoSay/NoLoApp/issues).
