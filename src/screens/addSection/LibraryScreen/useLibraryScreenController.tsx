/**
 * @fileoverview This hook contains the logic for the LibraryScreen component.
 * @module useLibraryScreenController
 * @requires react
 */

import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../../global/contexts/AccountProvider'
import { Video } from '../../../global/types/Videos'
import getUserVideos from '../../../helpers/httpClient/videos'

export default function useLibraryScreenController() {
  const { account } = useContext(AccountContext)
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getUserVideos({ userId: account.accountID })
      .then(res => {
        setVideos(res)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
    setLoading(false)
  }, [account.accountID])

  return {
    account,
    videos,
    loading,
  }
}
