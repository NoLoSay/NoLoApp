/**
 * @fileoverview Overlay module that displays different options to help the user while he records a video.
 * @module OverlayModule
 * @requires react react-native
 */
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '@source/global/colors'
import useOverlayModuleController from './useOverlayModuleController'
import AssistantView from './Views/AssistantView'
import TimerCountdownView from './Views/TimerCountdownView'
import TimerSliderView from './Views/TimerSliderView'
import PrompterModule from './PrompterModule/PrompterModule'

/**
 * @typedef Props
 * @property {boolean} isRecording Wether the user is recording a video or not
 * @property {number} timerValue The timer value
 * @property {React.Dispatch<React.SetStateAction<number>>} setTimerValue Function that sets the timer value
 * @property {number} defaultTimerValue The default timer value
 * @property {React.Dispatch<React.SetStateAction<number>>} setDefaultTimerValue Function that sets the default timer value
 */
type Props = {
  isRecording: boolean
  timerValue: number
  setTimerValue: React.Dispatch<React.SetStateAction<number>>
  defaultTimerValue: number
  setDefaultTimerValue: React.Dispatch<React.SetStateAction<number>>
}

/**
 * @function OverlayModule
 * @description Component that renders the Overlay module.
 * @param {boolean} isRecording Wether the user is recording a video or not
 * @param {number} timerValue The timer value
 * @param {React.Dispatch<React.SetStateAction<number>>} setTimerValue Function that sets the timer value
 * @param {number} defaultTimerValue The default timer value
 * @param {React.Dispatch<React.SetStateAction<number>>} setDefaultTimerValue Function that sets the default timer value
 * @returns {JSX.Element} OverlayModule component
 */
export default function OverlayModule({
  isRecording,
  timerValue,
  setTimerValue,
  defaultTimerValue,
  setDefaultTimerValue,
}: Props): JSX.Element {
  const { isAssistantVisible, onTimerPress, isTimerModalVisible, OVERLAY_OPTIONS, isPrompterVisible } =
    useOverlayModuleController({
      defaultTimerValue,
    })

  return (
    <View style={styles.container}>
      {isAssistantVisible && <AssistantView />}
      <TimerCountdownView timerValue={timerValue} />
      {isTimerModalVisible && (
        <TimerSliderView
          toggleVisibility={onTimerPress}
          setTimerValue={setTimerValue}
          defaultTimerValue={defaultTimerValue}
          setDefaultTimerValue={setDefaultTimerValue}
        />
      )}
      {isPrompterVisible && !isTimerModalVisible && (
        <PrompterModule
          text='Dolor qui irure labore est magna. Qui labore occaecat minim esse sunt voluptate est magna. Magna magna id elit consequat sit.

Ut aliquip irure excepteur sit voluptate occaecat magna et deserunt ex do esse aute. Nostrud labore adipisicing elit tempor ea occaecat. Officia est esse ullamco minim officia consequat ad fugiat irure proident ad eu pariatur. Amet officia ad ea sunt.

Voluptate fugiat aliqua reprehenderit esse ullamco excepteur pariatur exercitation mollit non. Veniam fugiat adipisicing non fugiat laboris veniam ea ullamco excepteur deserunt sunt. Voluptate et consectetur nulla reprehenderit cupidatat sint elit deserunt. Pariatur ut dolore sint consequat Lorem minim sint veniam sit deserunt tempor incididunt. Enim proident tempor esse anim laboris enim anim reprehenderit qui ullamco. Minim est deserunt est ex ipsum adipisicing mollit et. Pariatur non Lorem minim excepteur proident.

Dolor eiusmod irure in enim eu ea. Excepteur minim non occaecat amet sit incididunt enim. Incididunt dolor fugiat incididunt aliquip nulla consectetur aliquip et. Ad officia duis culpa sunt cillum aliquip culpa Lorem nostrud aliqua consequat incididunt.

Enim proident exercitation excepteur sit do minim aliquip et reprehenderit Lorem mollit ex. Elit non ipsum adipisicing fugiat enim quis. Cupidatat voluptate proident tempor qui dolore tempor veniam ad officia ipsum ea culpa culpa Lorem. Officia exercitation magna excepteur incididunt occaecat irure eu dolor.

Mollit nulla amet ea mollit sint elit est aute sunt deserunt sit laborum. Dolore mollit laborum cupidatat cillum fugiat irure reprehenderit et aute esse eu cillum. Ea culpa dolore in veniam in consequat enim ipsum aute nulla. Ex occaecat deserunt do culpa ullamco commodo do amet in. Fugiat consectetur enim voluptate commodo elit laboris eu sint magna ex laboris. Ut do nulla excepteur Lorem laboris. Est sint consectetur id occaecat ex elit nostrud.

Minim id mollit consequat sit ad adipisicing quis duis tempor eu minim. Officia ea sunt exercitation dolore nostrud nostrud irure qui anim elit nostrud. Sit irure est aliqua dolor voluptate velit exercitation eiusmod magna aliquip id.

Ullamco nostrud aute magna labore consectetur nulla fugiat ut. Quis cillum anim ad eiusmod deserunt magna esse irure et voluptate. Ut non ea ullamco qui irure aute magna tempor. Consectetur quis in laborum minim. Commodo culpa duis aliqua esse dolore cupidatat ea enim culpa. Aute veniam incididunt aliquip fugiat est duis anim pariatur.

Cillum duis Lorem quis voluptate cupidatat quis cillum sit et irure tempor nulla Lorem cupidatat. Sit adipisicing magna reprehenderit nostrud. Consequat proident magna labore amet aliqua quis adipisicing veniam excepteur sunt et. Officia quis elit exercitation ea veniam ipsum. Elit Lorem est laborum pariatur eu commodo nulla tempor irure proident reprehenderit. Tempor laborum irure proident laboris fugiat dolore esse enim est. In eiusmod pariatur dolor quis excepteur anim.

Quis dolor mollit elit minim adipisicing incididunt sunt. Sint dolore aliqua dolor do reprehenderit. Labore culpa enim sunt fugiat veniam laboris ipsum dolor eu commodo incididunt. Dolore quis fugiat labore sit mollit dolor.Sunt dolore cillum nisi deserunt duis ad labore pariatur reprehenderit occaecat velit est. Id quis adipisicing labore excepteur nisi quis sit reprehenderit consequat occaecat. Ut ullamco do laborum aliquip culpa cillum qui reprehenderit irure deserunt quis culpa officia. Eiusmod culpa excepteur occaecat veniam dolor ex eiusmod do proident ex ipsum tempor.

Dolor quis mollit velit enim excepteur ullamco aliqua ex proident. Excepteur eiusmod exercitation minim dolor ipsum sit dolore. Sint fugiat nostrud qui cillum est minim id aliquip nostrud. Nostrud ad deserunt minim adipisicing aute reprehenderit velit labore eu. Ut ex enim veniam qui fugiat incididunt velit Lorem fugiat sit laboris quis quis id. Adipisicing aute enim proident reprehenderit. Id esse nisi aliquip do sint excepteur ea dolore esse ut consectetur consequat enim officia.

Voluptate tempor mollit nisi veniam consectetur officia aliquip dolor occaecat commodo ut do veniam. Nostrud ad consectetur excepteur consequat. Aliquip qui et enim incididunt mollit in commodo aliquip. In culpa do proident aliqua ad cupidatat consectetur ex do. Commodo do velit officia anim non Lorem labore proident tempor cupidatat exercitation ut ex.

Proident eiusmod labore aliqua fugiat aliquip ut in. Mollit ipsum ea nisi consectetur est ut laboris esse nostrud do quis nulla exercitation. Aliqua ut voluptate duis elit fugiat est aliqua cillum in velit aliquip.

Elit ut tempor nisi occaecat ut elit in nostrud minim aute voluptate deserunt velit. Qui sint nulla ipsum exercitation. Magna ut anim aliquip nulla Lorem quis esse nostrud voluptate nulla commodo sit aute qui. Labore non nisi Lorem esse enim. Excepteur quis esse dolor ipsum.

Deserunt irure sunt reprehenderit eiusmod mollit ex officia exercitation consequat dolore ex aute reprehenderit. Culpa consectetur culpa aute consequat ea cillum incididunt. Dolore consequat pariatur consequat excepteur eu Lorem mollit.

Incididunt nisi incididunt id ex. Ut aute et consequat cupidatat sit laborum aute adipisicing dolor adipisicing tempor. Dolore esse proident ad dolor eu velit. Laborum ullamco dolor aliqua do nisi amet proident. Esse ea velit commodo irure nisi mollit sint occaecat fugiat ut officia est cupidatat. In nostrud voluptate sit irure ut commodo aliqua nostrud duis aliquip laborum incididunt ullamco nostrud.

Dolore ut dolor irure culpa adipisicing anim dolore labore sint ullamco consequat mollit dolor. Dolor cillum tempor sint et incididunt veniam amet. Adipisicing cillum aute aliquip et pariatur tempor quis. Deserunt id voluptate cupidatat irure irure excepteur ipsum ut sit sint aute officia cupidatat.

Aliquip anim ullamco anim ullamco aliqua non. Aliqua laboris tempor ipsum elit sunt. Cupidatat dolor nostrud mollit nostrud do sunt aliqua ipsum esse dolore cupidatat. Ad excepteur fugiat velit consectetur deserunt nostrud. Duis voluptate ea id nisi velit aliqua. Quis dolor magna adipisicing anim aliqua in minim et veniam irure.

Duis quis laborum tempor ipsum eu. Aliquip irure consequat ea ipsum aute elit magna anim irure cupidatat magna adipisicing non. Deserunt elit amet nisi officia et id aute. Amet qui proident ut quis culpa consequat incididunt aliquip adipisicing fugiat fugiat do velit quis.'
          isRecording={isRecording}
          timer={timerValue}
        />
      )}
      {!isRecording && (
        <View style={styles.optionsContainer}>
          {OVERLAY_OPTIONS.map(option => (
            <Pressable
              key={option.title}
              style={styles.overlayCategoryButton}
              onPress={option.onPress}
            >
              <Image
                source={option.icon}
                style={styles.icon}
              />
              <Text style={styles.categoryText}>{option.title}</Text>
              {option.isActivated() && <View style={styles.activatedLine} />}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlayCategoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionsContainer: {
    width: '20%',
    backgroundColor: colors.black,
    opacity: 0.5,
    paddingHorizontal: 4,
    paddingVertical: 8,
    position: 'absolute',
    right: 8,
    top: '16%',
    borderRadius: 16,
  },
  icon: {
    height: 36,
    aspectRatio: 1,
    tintColor: colors.white,
  },
  activatedLine: {
    position: 'absolute',
    top: 18,
    width: 56,
    height: 2,
    backgroundColor: colors.accent,
    transform: [{ rotate: '45deg' }],
  },
  categoryText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    textAlign: 'center',
    color: colors.white,
  },
})
