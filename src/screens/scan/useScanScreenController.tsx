/**
 * @fileoverview Scan screen controller.
 * @module useScanScreenController
 * @description Controller for the scan screen.
 * @requires react react
 */

import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountType } from '@source/global/types/Account'
import { useContext } from 'react'

interface ScanScreenController {
  account: AccountType
}

/**
 * @function useScanScreenController
 * @description Controller that handles the logic for the scan screen.
 * @returns {ScanScreenController} Scan screen controller.
 */
export default function useScanScreenController(): ScanScreenController {
  const { account } = useContext(AccountContext)

  return {
    account,
  }
}
