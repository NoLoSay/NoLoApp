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
import { Place } from '@global/types/Places'
import { AccountContext, defaultLocalisation } from '@global/contexts/AccountProvider'
import getCity from '@helpers/httpClient/localization'
import { Alert, Linking } from 'react-native'
import { GeolocationResponse } from '@global/types/Account'
import useNoloPlaces from '@helpers/httpClient/queries/places/useNoloPlaces'

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
 * @property {() => Place[]} getNearestPlaces The function to get the nearest places
 * @property {boolean} isLoading The loading state of the screen
 * @property {() => void} onRefresh The function to refresh the screen
 * @property {boolean} isRefreshing The refreshing state of the screen
 * @property {boolean} isSuccessful The success state of the screen
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
  getAllPlacesUsingSearch: () => void
  isLoading: boolean
  onRefresh: () => void
  isRefreshing: boolean
  isSuccessful: boolean
}

/**
 * @function useHomeScreenController
 * @description HomeScreenController hook logic function
 * @returns {HomeScreenController} The controller of the HomeScreen component
 */
export default function useHomeScreenController(): HomeScreenController {
  const [city, setCity] = useState('')
  const [currentPage, setCurrentPage] = useState<'map' | 'carousel'>('carousel')
  const [displaySearchBar, setDisplaySearchBar] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { account, setAccount } = useContext(AccountContext)
  const [places, setPlaces] = useState<Place[]>([])
  const noloPlacesMutation = useNoloPlaces({
    setPlaces,
    latitude: account.localisation?.coords.latitude || 0,
    longitude: account.localisation?.coords.longitude || 0,
    token: account.accessToken,
  })
  const noloPlacesMutationUsingSearch = useNoloPlaces({
    setPlaces,
    q: searchValue,
    token: account.accessToken,
  })

  const getAllPlaces = () => {
    noloPlacesMutation.mutate()
  }

  const getAllPlacesUsingSearch = () => {
    noloPlacesMutationUsingSearch.mutate()
    toggleSearchBar()
    setCity(searchValue)
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async (info: GeolocationResponse) => {
        setAccount({ ...account, localisation: info })

        const reversedCity = await getCity({ latitude: info.coords.latitude, longitude: info.coords.longitude })

        setCity(reversedCity)
      },
      async () => {
        setCity('Nantes')
        setAccount({
          ...account,
          localisation: defaultLocalisation,
        })
        const reversedCity = await getCity({
          latitude: defaultLocalisation.coords.latitude,
          longitude: defaultLocalisation.coords.longitude,
        })

        setCity(reversedCity)

        Alert.alert(
          'Localisation introuvable',
          "Vous avez désactivé la localisation, pour optimiser votre expérience, veuillez l'activer dans vos réglages",
          [
            { text: 'Activer', onPress: () => Linking.openSettings() },
            { text: 'Plus tard', style: 'cancel' },
          ]
        )
      },
      { enableHighAccuracy: true }
    )
    getAllPlaces()
    // Avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onRefresh() {
    getAllPlaces()
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
        (a.address.latitude - localisation.latitude) ** 2 + (a.address.longitude - localisation.longitude) ** 2
      )
      const distanceB = Math.sqrt(
        (b.address.latitude - localisation.latitude) ** 2 + (b.address.longitude - localisation.longitude) ** 2
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
    getAllPlacesUsingSearch,
    isLoading: noloPlacesMutation.isPending || noloPlacesMutationUsingSearch.isPending,
    onRefresh,
    isRefreshing: noloPlacesMutation.isPending,
    isSuccessful: noloPlacesMutation.isSuccess || noloPlacesMutationUsingSearch.isSuccess,
  }
}
