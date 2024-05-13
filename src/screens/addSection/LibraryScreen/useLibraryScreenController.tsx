/**
 * @fileoverview This hook contains the logic for the LibraryScreen component.
 * @module useLibraryScreenController
 * @requires react
 */

import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '@global/contexts/AccountProvider'
import { VideoLibrary } from '@global/types/httpClient/queries/videos'
import useUserVideo from '@helpers/httpClient/queries/videos/useUserVideo'

export default function useLibraryScreenController() {
  const { account } = useContext(AccountContext)
  const [videos, setVideos] = useState<VideoLibrary[]>([])
  const [error, setError] = useState<string>('')
  const [displayVideos, setDisplayVideos] = useState<boolean>(false)
  const userVideoMutation = useUserVideo({ setVideos, userId: account.accountID, setError, token: account.accessToken })

  useEffect(() => {
    userVideoMutation.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setDisplayVideos(videos.length > 0)
  }, [videos])

  return {
    videos,
    displayVideos,
    loading: userVideoMutation.isPending,
    error,
  }
}
