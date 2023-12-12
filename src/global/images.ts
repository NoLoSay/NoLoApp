/**
 * @fileoverview Images global constants, used to style the app.
 * @module images
 * @description Images global constants, used to style the app.
 */

/* eslint-disable global-require */
export const images = {
  icons: {
    full: {
      add: () => require('../../assets/icons/full/add.png'),
      eye: () => require('../../assets/icons/full/eye.png'),
      home: () => require('../../assets/icons/full/home.png'),
      username: () => require('../../assets/icons/full/username.png'),
      qr: () => require('../../assets/icons/full/qr.png'),
      shield: () => require('../../assets/icons/full/shield.png'),
      user: () => require('../../assets/icons/full/user.png'),
    },
    maps: {
      pin: () => require('../../assets/icons/maps/map_pin.png'),
    },
    outline: {
      add: () => require('../../assets/icons/outline/add.png'),
      assistant: () => require('../../assets/icons/outline/assistant.png'),
      backArrow: () => require('../../assets/icons/outline/back_arrow.png'),
      blind: () => require('../../assets/icons/outline/blind.png'),
      camera: () => require('../../assets/icons/outline/camera.png'),
      carousel: () => require('../../assets/icons/outline/carousel.png'),
      clock: () => require('../../assets/icons/outline/clock.png'),
      community: () => require('../../assets/icons/outline/community.png'),
      contract: () => require('../../assets/icons/outline/CGU.png'),
      cross: () => require('../../assets/icons/outline/cross.png'),
      deaf: () => require('../../assets/icons/outline/deaf.png'),
      disabled: () => require('../../assets/icons/outline/disabled.png'),
      home: () => require('../../assets/icons/outline/home.png'),
      library: () => require('../../assets/icons/outline/library.png'),
      magnifier: () => require('../../assets/icons/outline/magnifier.png'),
      mapArrow: () => require('../../assets/icons/outline/map_arrow.png'),
      menu: () => require('../../assets/icons/outline/menu.png'),
      open: () => require('../../assets/icons/outline/open.png'),
      pen: () => require('../../assets/icons/outline/pen.png'),
      qr: () => require('../../assets/icons/outline/qr.png'),
    },
    social: {
      apple: () => require('../../assets/icons/social/apple.png'),
      facebook: () => require('../../assets/icons/social/facebook.png'),
      google: () => require('../../assets/icons/social/google.png'),
    },
    twoTones: {
      bell: () => require('../../assets/icons/twoTones/bell.png'),
      heart: () => require('../../assets/icons/twoTones/heart.png'),
      lock: () => require('../../assets/icons/twoTones/lock.png'),
      logout: () => require('../../assets/icons/twoTones/logout.png'),
      profile: () => require('../../assets/icons/twoTones/profile.png'),
    },
    qrScanner: () => require('../../assets/images/qr_scanner.png'),
  },
  logos: {
    heart: () => require('../../assets/images/logos/heart.png'),
    logo: () => require('../../assets/images/logos/logo.png'),
    nolosad: () => require('../../assets/images/logos/nolosad.png'),
    nolosay: () => require('../../assets/images/logos/nolosay.png'),
  },
}

export default images
