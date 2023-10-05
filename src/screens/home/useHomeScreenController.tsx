/**
 * @fileoverview useHomeScreenController hook controls the HomeScreen component
 * @module HomeScreen Controller Hook
 * @description Controls the HomeScreen component by managing the states of the screen.
 * @requires react
 * @requires react-native
 * @requires @react-native-community/geolocation
 * @requires @source/global/contexts/AccountProvider
 * @requires @source/global/types/Account
 */

import Geolocation from '@react-native-community/geolocation'
import { AccountContext } from '@source/global/contexts/AccountProvider'
import { Place, PlaceTag, PlaceType } from '@source/global/types/Places'
import { useContext, useEffect, useState } from 'react'

/**
 * @interface HomeScreenController
 * @description HomeScreenController types
 * @property {string} city The city of the user
 * @property {'map' | 'carousel'} currentPage The current page of the screen
 * @property {boolean} displaySearchBar The display state of the search bar
 * @property {() => void} toggleSearchBar The function to toggle the search bar
 * @property {string} searchValue The value of the search bar
 * @property {(value: string) => void} setSearchValue The function to set the value of the search bar
 * @property {() => void} togglePage The function to toggle the current page of the screen
 * @property {Place[]} places The places of the user
 * @property {AccountType} account The account of the user
 */
interface HomeScreenController {
  city: string
  currentPage: 'map' | 'carousel'
  displaySearchBar: boolean
  toggleSearchBar: () => void
  searchValue: string
  setSearchValue: (value: string) => void
  togglePage: () => void
  places: Place[]
}

/**
 * @function useHomeScreenController
 * @description HomeScreenController hook logic function
 * @returns {HomeScreenController} The controller of the HomeScreen component
 */
export default function useHomeScreenController(): HomeScreenController {
  const city = 'Nantes'
  const [currentPage, setCurrentPage] = useState<'map' | 'carousel'>('carousel')
  const [displaySearchBar, setDisplaySearchBar] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { account, setAccount } = useContext(AccountContext)
  const places = [
    {
      id: 1,
      name: 'Château des ducs de Bretagne',
      longDescription: 'Château du XVème siècle',
      shortDescription: 'Château du XVème siècle',
      image:
        'https://www.chateaunantes.fr/wp-content/uploads/2020/02/Musee-dhistoire-de-Nantes.-Nantes-©-David-Gallard-_-LVAN-1800x1200.jpg',
      address: '4 Place Marc Elder, 44000 Nantes',
      phone: '02 51 17 49 48',
      email: 'chateau@nantes.fr',
      website: 'https://www.chateaunantes.fr/fr',
      coordinates: {
        latitude: 47.215833,
        longitude: -1.55,
      },
      type: PlaceType.MUSEUM,
      price: 0,
      city: 'Nantes',
      country: 'France',
      tags: [PlaceTag.NO_LOSAY, PlaceTag.BLIND, PlaceTag.DEAF, PlaceTag.DISABLED],
    },
    {
      id: 2,
      name: 'Hellfest',
      shortDescription: 'Festival de musique métal',
      longDescription: 'Festival de musique métal à Clisson (44)',
      image: 'https://lecanalauditif.ca/wp-content/uploads/2021/01/Hellfest-.jpg',
      address: 'Rue du Champ Louet, 44190 Clisson',
      phone: '02 51 17 49 48',
      email: 'hellfest@hellfest.fr',
      website: 'https://www.hellfest.fr',
      coordinates: {
        latitude: 47.09750371051718,
        longitude: -1.2700803720514064,
      },
      type: PlaceType.PUBLIC,
      price: 105,
      city: 'Clisson',
      country: 'France',
      tags: [PlaceTag.NO_LOSAY, PlaceTag.BLIND, PlaceTag.DISABLED],
    },
    {
      id: 3,
      name: 'Apple Park',
      shortDescription: 'Apple Park is the corporate headquarters of Apple Inc.',
      longDescription: 'Apple Park is the corporate headquarters of Apple Inc.',
      image: 'https://rtlimages.apple.com/cmc/dieter/store/16_9/R824.png',
      address: 'Apple Inc. 1 Apple Park Way. Cupertino, CA 95014',
      phone: '+1 (408) 996-1010',
      email: 'apple.icloud@apple.com',
      website: 'https://www.apple.com',
      coordinates: {
        latitude: 37.33182,
        longitude: -122.03118,
      },
      type: PlaceType.PUBLIC,
      price: 0,
      city: 'Cupertino',
      country: 'United States',
      tags: [PlaceTag.NO_LOSAY, PlaceTag.BLIND, PlaceTag.DISABLED],
    },
  ]

  useEffect(() => {
    Geolocation.getCurrentPosition(info => setAccount({ ...account, localisation: info }))
  })

  function togglePage() {
    setCurrentPage(currentPage === 'map' ? 'carousel' : 'map')
  }

  function toggleSearchBar() {
    setDisplaySearchBar(!displaySearchBar)
  }

  return {
    city,
    currentPage,
    displaySearchBar,
    toggleSearchBar,
    searchValue,
    setSearchValue,
    togglePage,
    places,
  }
}
