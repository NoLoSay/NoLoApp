import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AccountContext } from '@global/contexts/AccountProvider'
import { get, post } from '@helpers/httpClient/common'
import { AccountElevationEnum, AccountType } from '@global/types/Account'

async function getRoles({ accessToken }: { accessToken: string }) {
  const response = await get({ endpoint: `/profiles`, authorizationToken: accessToken })

  if (!response.ok) {
    throw new Error('An error occurred while fetching roles.')
  }

  const responseData = await response.json()

  return responseData
}

export type Role = {
  id: number
  role: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export default function useGetRoles({
  setRoles,
  setActiveRole,
}: {
  setRoles: (roles: Role[]) => void
  setActiveRole: (role: number) => void
}) {
  const { account } = useContext(AccountContext)

  const mutation = useMutation<Role[]>({
    mutationFn: () => getRoles({ accessToken: account.accessToken }),
    onSuccess: data => {
      setRoles(data)
      setActiveRole(data.find(role => role.isActive)?.id || data[0].id)
    },
    onError: error => {
      return error
    },
  })

  return mutation
}

async function changeRole({
  accessToken,
  account,
  setAccount,
  roleId,
}: {
  accessToken: string
  account: AccountType
  setAccount: (newAccount: AccountType) => void
  roleId: number
}) {
  const response = await post({
    endpoint: '/profiles/change',
    authorizationToken: accessToken,
    body: JSON.stringify({ profileId: roleId }),
  })

  function giveRole(role: string): AccountElevationEnum {
    switch (role) {
      case 'ADMIN':
        return AccountElevationEnum.ADMIN
      case 'MANAGER':
        return AccountElevationEnum.MANAGER
      case 'MODERATOR':
        return AccountElevationEnum.MODERATOR
      case 'CREATOR':
        return AccountElevationEnum.CREATOR
      default:
        return AccountElevationEnum.USER
    }
  }

  if (!response.ok) {
    throw new Error('An error occurred while changing the role.')
  }

  const responseData = await response.json()

  setAccount({ ...account, elevation: giveRole(responseData.activeProfile.role) })
}

export function useChangeRole() {
  const { account, setAccount } = useContext(AccountContext)

  return useMutation({
    mutationFn: ({ roleId }: { roleId: number }) =>
      changeRole({ accessToken: account.accessToken, account, setAccount, roleId }),
  })
}
