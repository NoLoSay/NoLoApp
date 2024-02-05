/**
 * @fileoverview This hook contains the logic for the LibraryScreen component.
 * @module useLibraryScreenController
 * @requires react
 */

import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '@global/contexts/AccountProvider'
import { Video } from '@global/types/Videos'
import useUserVideo from '@helpers/httpClient/queries/videos/useUserVideo'

export default function useLibraryScreenController() {
  const { account } = useContext(AccountContext)
  const [videos, setVideos] = useState<Video[]>([])
  const [error, setError] = useState<string>('')
  const userVideoMutation = useUserVideo({ setVideos, userId: account.accountID, setError })

  useEffect(() => {
    userVideoMutation.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    account,
    videos,
    loading: userVideoMutation.isPending,
    error,
  }
}
