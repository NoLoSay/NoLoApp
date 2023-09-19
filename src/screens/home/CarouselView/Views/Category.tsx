import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import CategorySeparator from './CategorySeparator'

interface dataType {
  name: string
  description: string
  id: number
  imageURL: string
  city?: string
}

interface Props {
  text: string
  data?: Array<dataType>
}

const DATA: Array<dataType> = [
  {
    name: 'Château des Ducs',
    description: 'Description du lieu 1',
    id: 1,
    imageURL:
      'https://www.chateaunantes.fr/wp-content/uploads/2020/07/Chateau-des-ducs-de-Bretagne.-Nantes-©-Philippe-Piron-_-LVAN-1-scaled.jpg',
    city: 'Nantes',
  },
  {
    name: 'Hellfest',
    description: 'Description du lieu 1',
    id: 2,
    imageURL: 'https://lecanalauditif.ca/wp-content/uploads/2021/01/Hellfest-.jpg',
    city: 'Nantes',
  },
  {
    name: 'H Arena',
    description: 'Description du lieu 1',
    id: 3,
    imageURL: 'https://hbcnantes.com/uploads/hbc-nantes/pages/ehf-barca-bd-48-compressor.jpg',
    city: 'Nantes',
  },
  {
    name: 'Random place',
    description: 'Paradise',
    id: 4,
    imageURL: 'https://picsum.photos/200/300',
    city: 'Paradise',
  },
]

export default function Category({ text, data = DATA }: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <CategorySeparator text={text} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ overflow: 'visible' }}
      >
        {data.map((item: dataType) => (
          <View
            style={styles.categoryContainer}
            key={item.id}
          >
            <TouchableOpacity onPress={() => console.log(item)}>
              <FastImage
                source={{
                  uri: item.imageURL,
                  priority: FastImage.priority.normal,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.itemText}>
              {item.name.length > 13 ? `${item.name.substring(0, 13)}...` : item.name}
            </Text>
            <Text style={styles.itemText}>{item.city}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  itemText: {
    fontSize: 12,
    textAlign: 'center',
  },
  image: {
    width: 96,
    height: 154,
    borderRadius: 20,
  },
  categoryContainer: {
    flexDirection: 'column',
    marginRight: 16,
  },
})
