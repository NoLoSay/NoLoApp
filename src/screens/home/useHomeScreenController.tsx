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
import { Place } from '@source/global/types/Places'
import getPlaces from '@source/helpers/httpClient/places'
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
  getNearestPlaces: () => Place[]
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
  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    Geolocation.getCurrentPosition(info => setAccount({ ...account, localisation: info }))
    getPlaces().then(loadedPlaces => setPlaces(loadedPlaces))
  })

  function togglePage() {
    setCurrentPage(currentPage === 'map' ? 'carousel' : 'map')
  }

  function toggleSearchBar() {
    setDisplaySearchBar(!displaySearchBar)
  }

  function getNearestPlaces() {
    let localisation = {
      latitude: 0,
      longitude: 0,
    }
    if (account.localisation) localisation = account.localisation.coords
    const placesBis = [...places]

    const placesOrderedByDistance = placesBis.sort((a, b) => {
      const distanceA = Math.sqrt(
        (a.coordinates.latitude - localisation.latitude) ** 2 + (a.coordinates.longitude - localisation.longitude) ** 2
      )
      const distanceB = Math.sqrt(
        (b.coordinates.latitude - localisation.latitude) ** 2 + (b.coordinates.longitude - localisation.longitude) ** 2
      )

      return distanceA - distanceB
    })
    return placesOrderedByDistance.slice(0, 5)
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
    getNearestPlaces,
  }
}
