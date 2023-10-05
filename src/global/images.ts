/**
 * @fileoverview Images global constants, used to style the app.
 * @module images
 * @description Images global constants, used to style the app.
 */

/* eslint-disable global-require */
export const images = {
  icons: {
    full: {
      add: require('@assets/icons/full/add.png'),
      home: require('@assets/icons/full/home.png'),
      qr: require('@assets/icons/full/qr.png'),
      shield: require('@assets/icons/full/shield.png'),
      user: require('@assets/icons/full/user.png'),
      eye: require('@assets/icons/full/eye.png'),
    },
    outline: {
      add: require('@assets/icons/outline/add.png'),
      home: require('@assets/icons/outline/home.png'),
      qr: require('@assets/icons/outline/qr.png'),
      carousel: require('@assets/icons/outline/carousel.png'),
      mapArrow: require('@assets/icons/outline/map_arrow.png'),
      magnifier: require('@assets/icons/outline/magnifier.png'),
      menu: require('@assets/icons/outline/menu.png'),
      cross: require('@assets/icons/outline/cross.png'),
      open: require('@assets/icons/outline/open.png'),
    },
    social: {
      facebook: require('@assets/icons/social/facebook.png'),
      google: require('@assets/icons/social/google.png'),
      apple: require('@assets/icons/social/apple.png'),
    },
    maps: {
      marker: require('@assets/icons/maps/ios_user.png'),
      pin: require('@assets/icons/maps/map_pin.png'),
    },
  },
  logos: {
    nolosay: require('@assets/images/logos/nolosay.png'),
    heart: require('@assets/images/logos/heart.png'),
    logo: require('@assets/images/logos/logo.png'),
  },
}

export default images
