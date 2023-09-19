import Geolocation from '@react-native-community/geolocation'
import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountType } from '@source/global/types/Account'
import getCityFromCoordinates from '@source/helpers/httpClient/reverseGeocoding'
import { useContext, useEffect, useState } from 'react'

interface HomeScreenController {
  city: string
  currentPage: 'map' | 'carousel'
  displaySearchBar: boolean
  toggleSearchBar: () => void
  searchValue: string
  setSearchValue: (value: string) => void
  togglePage: () => void
  changeCity: () => void
  account: AccountType
}

export default function useHomeScreenController(): HomeScreenController {
  const [city, setCity] = useState('Nantes')
  const [currentPage, setCurrentPage] = useState<'map' | 'carousel'>('carousel')
  const [displaySearchBar, setDisplaySearchBar] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { account, setAccount } = useContext(AccountContext)

  useEffect(() => {
    Geolocation.getCurrentPosition(info => setAccount({ ...account, localisation: info }))
  })

  function togglePage() {
    setCurrentPage(currentPage === 'map' ? 'carousel' : 'map')
  }

  function toggleSearchBar() {
    setDisplaySearchBar(!displaySearchBar)
  }

  function changeCity() {
    setCity(city === 'Nantes' ? 'Paris' : 'Nantes')
  }

  return {
    city,
    currentPage,
    displaySearchBar,
    toggleSearchBar,
    searchValue,
    setSearchValue,
    togglePage,
    changeCity,
    account,
  }
}
