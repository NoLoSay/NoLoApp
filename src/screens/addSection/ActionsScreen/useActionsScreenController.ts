import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ContentCategoryId } from '../../../global/types/AddContentCategory'
import { AccountElevationEnum, AccountType } from '../../../global/types/Account'
import { AccountContext } from '../../../global/contexts/AccountProvider'

interface useActionScreenControllerProps {
  account: AccountType
  displayAdminCategory: (categoryElevation?: AccountElevationEnum) => boolean
  onCategoryPress: (categoryId: string) => void
}

export default function useActionsScreenController(): useActionScreenControllerProps {
  const { account } = useContext(AccountContext)
  const navigation = useNavigation()

  const displayAdminCategory = (categoryElevation?: AccountElevationEnum) => {
    return account.elevation >= (categoryElevation ?? AccountElevationEnum.USER)
  }

  function onCategoryPress(categoryId: string) {
    switch (categoryId) {
      case ContentCategoryId.ADDCONTENT:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigation.navigate('VideoScreen')
        break
      case ContentCategoryId.LIBRARY:
        console.log('Pressed on library')
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
