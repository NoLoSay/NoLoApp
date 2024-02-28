# Welcome to NoLoSay 👋

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000"/>
  <a href="https://nolosay.github.io/documentation" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg"/>
  </a>
  <a href="https://github.com/NoLoSay/NoLoApp/blob/main/LICENSE.md" target="_blank">
    <img alt="License: Private" src="https://img.shields.io/badge/License-Private-yellow.svg"/>
  </a>
  <a href="https://github.com/NoLoSay/NoLoApp/actions/workflows/main_push.yml">
    <img alt="CI status" src="https://github.com/NoLoSay/NoLoApp/actions/workflows/main_push.yml/badge.svg">
  </a>
</p>

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

> NoLoSay is an EPITECH project made to improve the accessibility of deaf people in cultural sites

## 🏠 [Homepage](https://nolosay.github.io)

## ✨ [Visuals](https://nolosay.github.io/demo)

## 📝 [Documentation](https://nolosay.github.io/documentation)

## Development environment installation

Before starting, you need to setup your environment. We have a guide for that [here](./SETUP_ENVIRONMENT.md).

## Install dependencies

```sh
yarn install
```

## Usage

First launch your metro :

```sh
yarn start
```

Then launch the app on your device, depending on the wanted OS :

```sh
yarn ios
yarn android
```

If the build on iOS fails, you can try to do it manually with XCode.

To do so, open the `ios/NoLoSay.xcworkspace` file with XCode, then select your device and click on the play button.

To launch the server you'll need to do various things :

- First go to the server folder, then :

```sh
yarn install
cd libs/prisma/schema/base && npx prisma generate
cd ../translator && npx prisma generate
cd ../logs && npx prisma generate
cd ../../../../
docker compose up postgres
npx prisma migrate deploy --schema libs/prisma/schema/base/prisma/schema.prisma
nx serve api
```

## Tests

Tests are done with [Jest](https://jestjs.io/)

To launch them :

```sh
yarn test
```

## Build the app for production

### iOS

Everything is done in XCode, you will need an apple developer license to do so.

### Android

⚠️ This will not work unless you have the appropriate signing keys. If you want to build the app for production, please contact @JohanCDev.

```sh
yarn android-release
```

## 🤝 Contributing

Issues and requests for improvements are welcome!<br />Feel free to check [issues page](https://github.com/NoLoSay/NoLoApp/issues). You can also take a look at the [contributing guide](./CONTRIBUTING.md). For every interactions you will have with and around the project, be sure to respect the [guidelines](./CODE_OF_CONDUCT.md)

## Authors

👤 **NoLo Incorporation**

<table>
    <tbody>
        <tr>
            <td align="center"><a href="https://github.com/JohanCDev"><img src="https://avatars.githubusercontent.com/u/25590592?v=4" width="100px;" alt="JohanCDev"/><br/><sub><b>Johan Chrillesen</b></sub></a><br/></td>
            <td align="center"><a href="https://github.com/TomDUVAL-MAHE/"><img src="https://avatars.githubusercontent.com/u/72017980?s=96&v=4" width="100px;" alt="TomDUVAL-MAHE"/><br/><sub><b>Tom Duval-Mahé</b></sub></a><br/></td>
            <td align="center"><a href="https://github.com/alaborde29/"><img src="https://avatars.githubusercontent.com/u/72009912?v=4" width="100px;" alt="alaborde29"/><br/><sub><b>Alexandre Laborde</b></sub></a><br/></td>
            <td align="center"><a href="https://github.com/julienlafargue"><img src="https://avatars.githubusercontent.com/u/72009611?s=96&v=4" width="100px;" alt="julienlafargue"/><br/><sub><b>Julien Lafargue</b></sub></a><br/></td>
        </tr>
        <tr>
            <td align="center"><a href="https://github.com/aurelenc"><img src="https://avatars.githubusercontent.com/u/33877327?s=96&v=4" width="100px;" alt="aurelenc"/><br/><sub><b>Aurèle Nicolas</b></sub></a><br/></td>
            <td align="center"><a href="https://github.com/Kubirt/"><img src="https://avatars.githubusercontent.com/u/72017065?s=96&v=4" width="100px;" alt="Kubirt"/><br/><sub><b>Alexandre Tomasin</b></sub></a><br/></td>
            <td align="center"><a href="https://github.com/UgoBoulestreau/"><img src="https://avatars.githubusercontent.com/u/72016899?s=96&v=4" width="100px;" alt="UgoBoulestreau"/><br/><sub><b>Ugo Boulestreau</b></sub></a><br/></td>
            <td align="center"><a href="https://github.com/ZQUEMA"><img src="https://avatars.githubusercontent.com/u/56249749?s=96&v=4" width="100px;" alt="ZQUEMA"/><br/><sub><b>Quentin Camilleri</b></sub></a><br/></td>
        </tr>
    </tbody>
</table>

## 📝 License

Copyright © 2023 [NoLo Incorporation](https://github.com/NoLoSay).<br />
This project is [privately](https://github.com/NoLoSay/NoLoApp/blob/main/LICENSE.md) licensed.

---
