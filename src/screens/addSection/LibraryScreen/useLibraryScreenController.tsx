/**
 * @fileoverview This hook contains the logic for the LibraryScreen component.
 * @module useLibraryScreenController
 * @requires react
 */

import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '@global/contexts/AccountProvider'
import { VideoLibrary } from '@global/types/httpClient/queries/videos'
import useUserVideo from '@helpers/httpClient/queries/videos/useUserVideo'

/**
 * @function useLibraryScreenController
 * @description This hook contains the logic for the LibraryScreen component.
 * @returns {Object} The logic for the LibraryScreen component
 */
export default function useLibraryScreenController() {
  const { account } = useContext(AccountContext)
  const [videos, setVideos] = useState<VideoLibrary[]>([])
  const [error, setError] = useState<string>('')
  const [displayVideos, setDisplayVideos] = useState<boolean>(false)
  const userVideoMutation = useUserVideo({ setVideos, userId: account.accountID, setError, token: account.accessToken })

  useEffect(() => {
    userVideoMutation.mutate()
  }, [])

  useEffect(() => {
    setDisplayVideos(videos[0] != null)
  }, [videos])

  return {
    videos,
    displayVideos,
    loading: userVideoMutation.isPending,
    error,
  }
}
