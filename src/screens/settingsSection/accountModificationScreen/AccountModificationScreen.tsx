/**
 * @fileoverview AccountModificationScreen is a screen where the user can modify his account information.
 * @module AccountModificationScreen
 * @requires react react-native
 */
import colors from '@global/colors'
import React, { useContext, useState } from 'react'
import { KeyboardTypeOptions, SectionList, StyleSheet, Text, TextInput, View } from 'react-native'
import { AccountContext } from '@global/contexts/AccountProvider'
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
  placeholder: string
}

/**
 * @function Item
 * @description Component that renders the Item view.
 * @param props.title Item title
 * @param props.value Item value
 * @param props.onChange Item value setter
 * @param props.keyboardType Item keyboard type (not required, default is 'default')
 * @param props.placeholder Item placeholder
 * @returns {JSX.Element} Item component template
 */
function Item({ title, value, onChange, keyboardType, placeholder }: ItemProps): JSX.Element {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(t: string) => onChange(t)}
        value={value}
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

  const DATA = [
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

  return (
    <View style={styles.container}>
      <TopBar
        navigation={navigation}
        title='Modifier mon compte'
      />
      <View style={styles.containerView}>
        <SectionList
          style={styles.sectionContainer}
          sections={DATA}
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
              onValidate={() => console.log('Validation')}
            />
          )}
        />
        <Text style={styles.date}>
          Membre depuis le{' '}
          {`${`0${account.createdAt.getDate()}`.slice(-2)}/${`0${account.createdAt.getMonth() + 1}`.slice(
            -2
          )}/${account.createdAt.getFullYear()}`}
        </Text>
      </View>
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
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    color: colors.black,
    fontFamily: 'Poppins',
    fontSize: 14,
    width: '50%',
    textAlign: 'right',
  },
  date: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '300',
    marginTop: 20,
    color: colors.darkGrey,
  },
})
