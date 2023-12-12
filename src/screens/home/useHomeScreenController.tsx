/**
 * @fileoverview useHomeScreenController hook controls the HomeScreen component
 * @module useHomeScreenController Controller Hook
 * @description Controls the HomeScreen component by managing the states of the screen.
 * @requires react
 * @requires react-native
 * @requires @react-native-community/geolocation
 */

import { useContext, useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { Place } from '../../global/types/Places'
import getPlaces from '../../helpers/httpClient/places'
import { AccountContext } from '../../global/contexts/AccountProvider'

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
  isLoading: boolean
  onRefresh: () => void
  isRefreshing: boolean
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
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getAllPlaces = () => {
    getPlaces().then(loadedPlaces => {
      setPlaces(loadedPlaces)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(info => setAccount({ ...account, localisation: info }))
    getAllPlaces()
    // Avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onRefresh() {
    setIsRefreshing(true)
    getAllPlaces()
    setIsRefreshing(false)
  }

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
    isLoading,
    onRefresh,
    isRefreshing,
  }
}
