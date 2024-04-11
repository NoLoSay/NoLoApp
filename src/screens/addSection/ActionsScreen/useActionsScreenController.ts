import { useCallback, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ContentCategoryId } from '@global/types/AddContentCategory'
import { AccountElevationEnum, AccountType } from '@global/types/Account'
import { AccountContext } from '@global/contexts/AccountProvider'

/**
 * @typedef {Object} useActionScreenControllerProps
 * @property {AccountType} account - Account of the user
 * @property {function} displayAdminCategory - Function to call to know if the admin category should be displayed
 * @property {function} onCategoryPress - Function to call when a category is pressed
 */
interface useActionScreenControllerProps {
  account: AccountType
  displayAdminCategory: (categoryElevation?: AccountElevationEnum) => boolean
  onCategoryPress: (categoryId: string) => void
}

/**
 * @function useActionsScreenController
 * @description Business logic of the Actions screen
 * @returns {useActionScreenControllerProps} - Object containing the business logic of the screen
 */
export default function useActionsScreenController(): useActionScreenControllerProps {
  const { account } = useContext(AccountContext)
  const navigation = useNavigation()

  /**
   * @function displayAdminCategory
   * @description Function to call to know if the admin category should be displayed
   * @param categoryElevation - Elevation required to access the category
   * @returns {boolean} - Boolean indicating if the admin category should be displayed
   */
  const displayAdminCategory = useCallback(
    (categoryElevation?: AccountElevationEnum) => {
      console.log('account.elevation', account.elevation)
      return account.elevation >= (categoryElevation ?? AccountElevationEnum.USER)
    },
    [account.elevation]
  )

  /**
   * @function onCategoryPress
   * @description Function handling the press on a category
   * @param categoryId - Id of the category pressed
   */
  function onCategoryPress(categoryId: string) {
    switch (categoryId) {
      case ContentCategoryId.ADDCONTENT:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigation.navigate('PlacesNeedingTranslation')
        break
      case ContentCategoryId.LIBRARY:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigation.navigate('LibraryScreen')
        break
      case ContentCategoryId.COMMUNITY:
        console.log('Pressed on community')
        break
      default:
        console.log('Pressed on unexisting button')
        break
    }
  }

  return {
    account,
    displayAdminCategory,
    onCategoryPress,
  }
}
