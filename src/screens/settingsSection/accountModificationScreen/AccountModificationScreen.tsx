/**
 * @fileoverview AccountModificationScreen is a screen where the user can modify his account information.
 * @module AccountModificationScreen
 * @requires react react-native
 */
import colors from '@global/colors'
import React, { useContext, useState } from 'react'
import { KeyboardTypeOptions, SectionList, StyleSheet, Text, TextInput, View } from 'react-native'
import LoadingModal from '@components/LoadingModal'
import { AccountContext } from '@global/contexts/AccountProvider'
import useChangePassword from '@helpers/httpClient/queries/auth/useChangePassword'
import useChangeUser from '@helpers/httpClient/queries/user/useChangeUser'
import TopBar from '../SharedViews/TopBar'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

type ItemProps = {
  title: string
  value: string
  onChange: (value: string) => void
  keyboardType?: KeyboardTypeOptions
  password?: boolean
  placeholder: string
}

/**
 * @function Item
 * @description Component that renders the Item view.
 * @param props.title Item title
 * @param props.value Item value
 * @param props.onChange Item value setter
 * @param props.keyboardType Item keyboard type (not required, default is 'default')
 * @param props.password Item is a password (not required, default is false)
 * @param props.placeholder Item placeholder
 * @returns {JSX.Element} Item component template
 */
function Item({ title, value, onChange, keyboardType, password, placeholder }: ItemProps): JSX.Element {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(t: string) => onChange(t)}
        value={value}
        secureTextEntry={password}
        keyboardType={keyboardType}
        placeholder={placeholder}
      />
    </View>
  )
}

type HeaderProps = {
  title: string
  onValidate: () => void
}

/**
 * @function Header
 * @description Component that renders the Header view.
 * @param {string} props.title Header title
 * @param {() => void} props.onValidate Header validation function
 * @returns {JSX.Element} Header component template
 */
function Header({ title, onValidate }: HeaderProps): JSX.Element {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
      <Text
        style={styles.headerValidationText}
        onPress={onValidate}
      >
        Valider
      </Text>
    </View>
  )
}

/**
 * @function AccountModificationScreen
 * @description Component that renders the AccountModificationScreen screen.
 * @param navigation Object containing the navigation prop.
 * @returns {JSX.Element} AccountModificationScreen component template
 */
export default function AccountModificationScreen({ navigation }: Props): JSX.Element {
  const { account } = useContext(AccountContext)
  const [username, setUsername] = useState(account.username)
  const [phoneNumber, setPhoneNumber] = useState(account.phoneNumber)
  const [email, setEmail] = useState(account.email)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const changePasswordMutation = useChangePassword({ email, newPassword: password, setError: setPasswordError })
  const changeGeneralDataMutation = useChangeUser({
    formUsername: username,
    formEmail: email,
    formPhoneNumber: phoneNumber,
    setError,
  })

  const changePassword = () => {
    setPasswordError('')
    if (password === passwordConfirmation && password !== '') {
      changePasswordMutation.mutate()
    } else {
      setError('Mots de passes différents')
    }
  }

  const changeGeneralData = () => {
    setError('')
    changeGeneralDataMutation.mutate()
  }

  const GENERAL_DATA = [
    {
      title: 'Informations générales',
      data: [
        {
          title: 'Adresse e-mail',
          value: email,
          onChange: setEmail,
          keyboardType: 'email-address',
          placeholder: 'Email',
        },
        { title: "Nom d'utilisateur", value: username, onChange: setUsername, placeholder: "Nom d'utilisateur" },
        {
          title: 'Téléphone',
          value: phoneNumber,
          onChange: setPhoneNumber,
          keyboardType: 'phone-pad',
          placeholder: 'Téléphone',
        },
      ],
    },
  ]

  const PASSWORD_DATA = [
    {
      title: 'Mot de passe',
      data: [
        {
          title: 'Nouveau mot de passe',
          value: password,
          onChange: setPassword,
          password: true,
          placeholder: 'Mot de passe',
        },
        {
          title: 'Confirmation du mot de passe',
          value: passwordConfirmation,
          onChange: setPasswordConfirmation,
          password: true,
          placeholder: 'Mot de passe',
        },
      ],
    },
  ]

  return (
    <View style={styles.container}>
      <TopBar
        navigation={navigation}
        title='Modifier mon compte'
      />
      <View style={styles.containerView}>
        <SectionList
          style={styles.sectionContainer}
          sections={GENERAL_DATA}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              value={item.value}
              onChange={item.onChange}
              keyboardType={item.keyboardType as KeyboardTypeOptions}
              placeholder={item.placeholder}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Header
              title={title}
              onValidate={changeGeneralData}
            />
          )}
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <SectionList
          style={styles.sectionContainer}
          sections={PASSWORD_DATA}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              value={item.value}
              onChange={item.onChange}
              password={item.password}
              placeholder={item.placeholder}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Header
              title={title}
              onValidate={changePassword}
            />
          )}
        />
        {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
        <Text style={styles.date}>
          Membre depuis le{' '}
          {`${`0${account.createdAt.getDate()}`.slice(-2)}/${`0${account.createdAt.getMonth() + 1}`.slice(
            -2
          )}/${account.createdAt.getFullYear()}`}
        </Text>
      </View>
      <LoadingModal visible={changePasswordMutation.isPending || changeGeneralDataMutation.isPending} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.veryLightGrey,
    flex: 1,
  },
  containerView: {
    paddingHorizontal: 16,
    height: 'auto',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: colors.veryLightGrey,
    borderBottomWidth: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerValidationText: {
    color: colors.system.cancelBlue,
    fontSize: 18,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.veryLightGrey,
    borderBottomWidth: 2,
  },
  sectionContainer: {
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    marginTop: 14,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    width: '42%',
  },
  inputContainer: {
    color: colors.black,
    fontFamily: 'Poppins',
    fontSize: 12,
    width: '50%',
    textAlign: 'right',
  },
  error: {
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    color: colors.error,
  },
  date: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '300',
    marginTop: 8,
    color: colors.darkGrey,
  },
})
