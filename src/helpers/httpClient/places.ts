/**
 * @fileoverview Places helper functions.
 * @module Places
 * @description Helper functions to get and handle places.
 */

import PlacesNeedingTranslationJSON, { NoloPlacesJSON } from '@global/types/httpClient/queries/places'
import { Place, ArtToTranslate, PlaceTag, PlaceType } from '@global/types/Places'
import { get } from './common'

const PLACES: Place[] = [
  {
    id: 1,
    name: 'Château des ducs de Bretagne',
    longDescription:
      "Le Château des Ducs de Bretagne est une imposante forteresse entourée de douves et de remparts, offrant une vue impressionnante dès l'approche. Sa construction a débuté au XIIIe siècle sous Pierre Mauclerc et a été achevée au XVe siècle par François II. Il incarne la puissance et le prestige des ducs de Bretagne. À l'intérieur de ses murs, on découvre un mélange captivant d'architecture médiévale et de style Renaissance, créant une atmosphère unique. Le château abrite aujourd'hui un musée qui raconte l'histoire de Nantes et de la Bretagne, avec des expositions interactives, des artefacts historiques et des maquettes impressionnantes.",
    shortDescription:
      'Forteresse historique, ancien siège des ducs de Bretagne, mêlant architecture médiévale et musée captivant.',
    picture:
      'https://www.chateaunantes.fr/wp-content/uploads/2020/02/Musee-dhistoire-de-Nantes.-Nantes-©-David-Gallard-_-LVAN-1800x1200.jpg',
    address: {
      street: 'Place Marc Elder',
      number: '4',
      postalCode: '44000',
      city: 'Nantes',
      country: 'France',
      latitude: 47.214167,
      longitude: -1.556944,
    },
    phone: '02 51 17 49 48',
    email: 'chateau@nantes.fr',
    website: 'https://www.chateaunantes.fr/fr',
    type: PlaceType.MUSEUM,
    price: 0,
    city: 'Nantes',
    country: 'France',
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
  {
    id: 2,
    name: 'Hellfest',
    shortDescription:
      'Festival de musique métal de renommée mondiale, attirant des fans passionnés et offrant des performances exceptionnelles.',
    longDescription:
      "Hellfest est un festival de musique métal qui prend place dans un cadre pittoresque à Clisson, une charmante ville de l'ouest de la France. Ce festival, créé en 2006, est devenu rapidement l'un des événements incontournables pour les amateurs de métal, offrant une programmation variée allant du heavy metal au black metal, en passant par le death metal et le doom metal. Chaque année, des milliers de fans se réunissent pour célébrer la musique métal dans une atmosphère de camaraderie et de passion.",
    picture: 'https://lecanalauditif.ca/wp-content/uploads/2021/01/Hellfest-.jpg',
    address: {
      street: 'Rue du Champ Louet',
      number: '1',
      postalCode: '44190',
      city: 'Clisson',
      country: 'France',
      latitude: 47.09750371051718,
      longitude: -1.2700803720514064,
    },
    phone: '02 51 17 49 48',
    email: 'hellfest@hellfest.fr',
    website: 'https://www.hellfest.fr',
    type: PlaceType.PUBLIC_PLACE,
    price: 105,
    city: 'Clisson',
    country: 'France',
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
  {
    id: 3,
    name: 'Apple Park',
    shortDescription:
      "Campus emblématique d'Apple à Cupertino, alliant architecture futuriste, espaces verts, et innovation technologique.",
    longDescription:
      "Apple Park, souvent surnommé le 'vaisseau spatial d'Apple,' est un campus ultramoderne qui s'étend sur environ 71 hectares, offrant un environnement de travail révolutionnaire pour les employés d'Apple. Conçu par l'architecte renommé Sir Norman Foster, le bâtiment principal est une structure circulaire en verre et en acier, dotée d'un toit en forme d'anneau, qui abrite les bureaux et espaces de travail. Le campus est entouré d'un magnifique espace vert comprenant des milliers d'arbres, des espaces paysagers, des sentiers de promenade, et même un verger d'arbres fruitiers.",
    picture: 'https://rtlimages.apple.com/cmc/dieter/store/16_9/R824.png',
    address: {
      street: '1 Apple Park Way',
      number: '',
      postalCode: '95014',
      city: 'Cupertino',
      country: 'United States',
      latitude: 37.33182,
      longitude: -122.03118,
    },
    phone: '+1 (408) 996-1010',
    email: 'apple.icloud@apple.com',
    website: 'https://www.apple.com',
    type: PlaceType.MUSEUM,
    price: 0,
    city: 'Cupertino',
    country: 'United States',
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
  {
    id: 4,
    name: 'Puy du Fou',
    longDescription:
      'Puy du Fou est un parc à thème historique mondialement connu situé à Les Epesses, en France. Il offre aux visiteurs un voyage à travers le temps avec des spectacles en direct spectaculaires et des expériences immersives. Le parc est réputé pour ses reconstitutions historiques à grande échelle, notamment des batailles, des tournois médiévaux et des raids vikings, le tout dans des décors historiques magnifiquement recréés. Puy du Fou propose également de magnifiques jardins paysagers, des villages spécifiques à chaque époque et une variété de restaurants à thème servant une délicieuse cuisine française.',
    shortDescription:
      'Parc à thème historique avec des spectacles en direct à couper le souffle, des expériences immersives et des recréations impressionnantes de différentes époques historiques.',
    picture:
      'https://d2908q01vomqb2.cloudfront.net/64e095fe763fc62418378753f9402623bea9e227/2023/07/10/Le-Puy-du-Fou-Le-Signe-du-Triomphe-©Arthur-Aumond-2022-Copie.jpg',
    address: {
      street: '85590 Les Epesses',
      number: '',
      postalCode: '85590',
      city: 'Les Epesses',
      country: 'France',
      latitude: 46.890194,
      longitude: -0.937255,
    },
    phone: '+33 820 09 10 10',
    email: 'contact@puydufou.com',
    website: 'https://www.puydufou.com/en',
    type: PlaceType.ATTRACTION,
    price: 0,
    city: 'Les Epesses',
    country: 'France',
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
  {
    id: 5,
    name: 'Stade de La Beaujoire',
    longDescription:
      "Le Stade de La Beaujoire est un stade de football situé à Nantes, en France. Il est le domicile du club de football FC Nantes. Le stade a été inauguré en 1984 et est nommé d'après le quartier de La Beaujoire où il se trouve. Il peut accueillir plus de 35 000 spectateurs et est connu pour son architecture moderne et son atmosphère électrique pendant les matches. Le stade a également accueilli des événements internationaux, notamment des matchs de la Coupe du Monde de la FIFA en 1998.",
    shortDescription:
      'Stade de football moderne, domicile du FC Nantes, avec une ambiance électrique pendant les matches.',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Stade_de_la_Beaujoire.jpg',
    address: {
      street: '5 Boulevard de la Beaujoire',
      number: '',
      postalCode: '44300',
      city: 'Nantes',
      country: 'France',
      latitude: 47.248611,
      longitude: -1.519722,
    },
    phone: '02 40 52 94 94',
    email: 'contact@fcnantes.com',
    website: 'https://www.fcnantes.com/',
    type: PlaceType.PUBLIC_PLACE,
    price: 0,
    city: 'Nantes',
    country: 'France',
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
  {
    id: 6,
    name: 'Stade de France',
    longDescription:
      'Le Stade de France est le stade national de la France situé à Saint-Denis, en banlieue parisienne. Il est célèbre pour avoir accueilli la Coupe du Monde de la FIFA en 1998 et de nombreux événements sportifs et musicaux de renommée mondiale. Avec une capacité de plus de 80 000 places, il est le plus grand stade de France. Le Stade de France est un lieu emblématique du sport et du divertissement en France.',
    shortDescription:
      'Stade national emblématique de la France, accueille des événements sportifs et musicaux majeurs.',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/5/53/StadeFranceNationsLeague2018.jpg',
    address: {
      street: 'ZAC du Cornillon Nord',
      number: '',
      postalCode: '93216',
      city: 'Saint-Denis',
      country: 'France',
      latitude: 48.924722,
      longitude: 2.360833,
    },
    phone: '+33 1 55 93 00 00',
    email: 'contact@stadefrance.fr',
    website: 'https://www.stadefrance.com',
    type: PlaceType.PUBLIC_PLACE,
    price: 0,
    city: 'Saint-Denis',
    country: 'France',
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
  {
    id: 7,
    name: 'Musée du Louvre',
    longDescription:
      "Le Musée du Louvre est l'un des plus grands musées du monde, situé au cœur de Paris, en France. Il abrite une collection exceptionnelle d'œuvres d'art, allant de l'Antiquité à la Renaissance et au-delà. Les visiteurs peuvent admirer des trésors tels que la Joconde, la Vénus de Milo et de nombreuses autres œuvres emblématiques. Le musée est logé dans un palais magnifique et est un incontournable pour les amateurs d'art du monde entier.",
    shortDescription: "Musée renommé avec une collection exceptionnelle d'œuvres d'art, dont la Joconde.",
    picture:
      'https://cdn.sortiraparis.com/images/80/66131/350528-le-musee-du-louvre-coeur-artistique-et-touristique-de-la-capitale.jpg',
    address: {
      street: 'Rue de Rivoli',
      number: '75001',
      postalCode: '75001',
      city: 'Paris',
      country: 'France',
      latitude: 48.860833,
      longitude: 2.336389,
    },
    phone: '+33 1 40 20 50 50',
    email: 'contact@louvre.fr',
    website: 'https://www.louvre.fr',
    type: PlaceType.MUSEUM,
    price: 0,
    city: 'Paris',
    country: 'France',
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
  {
    id: 8,
    name: 'Tour Eiffel',
    longDescription:
      "La Tour Eiffel est l'un des monuments les plus emblématiques de Paris et du monde entier. Située dans le parc du Champ de Mars, elle a été construite pour l'Exposition universelle de 1889. Avec une hauteur de 324 mètres, elle offre des vues panoramiques spectaculaires sur la ville de Paris. Les visiteurs peuvent monter jusqu'au sommet de la tour pour une expérience inoubliable.",
    shortDescription: 'Monument emblématique offrant des vues panoramiques spectaculaires sur Paris.',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/1280px-Tour_Eiffel_Wikimedia_Commons.jpg',
    address: {
      street: 'Champ de Mars',
      number: '5',
      postalCode: '75007',
      city: 'Paris',
      country: 'France',
      latitude: 48.858844,
      longitude: 2.294351,
    },
    phone: '+33 892 70 12 39',
    email: 'contact@toureiffel.fr',
    website: 'https://www.toureiffel.paris/fr',
    type: PlaceType.PUBLIC_PLACE,
    price: 0,
    city: 'Paris',
    country: 'France',
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
  {
    id: 9,
    name: 'Jardin des Tuileries',
    longDescription:
      "Le Jardin des Tuileries est l'un des plus beaux jardins publics de Paris, adjacent au Musée du Louvre. Il a été créé au XVIe siècle et est un lieu de détente et de promenade très apprécié des Parisiens et des touristes. Les visiteurs peuvent admirer des statues, des fontaines et des parterres de fleurs magnifiquement entretenus tout en se promenant dans ce jardin historique.",
    shortDescription: 'Jardin public historique adjacent au Musée du Louvre.',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/f/fc/Grande_Roue_de_Paris_-_Louvre_et_Jardins_des_Tuileries.jpg',
    address: {
      street: 'Rue de Rivoli',
      number: '75001',
      postalCode: '75001',
      city: 'Paris',
      country: 'France',
      latitude: 48.863611,
      longitude: 2.326111,
    },
    phone: '+33 1 40 20 90 43',
    email: 'contact@tuileries.fr',
    website: 'https://www.paris.fr/lieux/jardin-des-tuileries-1795',
    type: PlaceType.PUBLIC_PLACE,
    price: 0,
    city: 'Paris',
    country: 'France',
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
  {
    id: 10,
    name: "Machines de l'île de Nantes",
    longDescription:
      "Les Machines de l'île de Nantes sont une attraction unique située sur l'île de Nantes. Elles combinent l'imagination de Jules Verne avec l'ingénierie créative pour créer des créatures mécaniques géantes. Les visiteurs peuvent monter à bord du Grand Éléphant, explorer le Carrousel des Mondes Marins, et découvrir un monde fantastique de machines en mouvement. C'est un endroit magique pour les enfants et les adultes.",
    shortDescription: 'Attraction avec des créatures mécaniques géantes inspirées de Jules Verne.',
    picture: 'https://www.lesmachines-nantes.fr/wp-content/uploads/2018/01/home_01.jpg',
    address: {
      street: 'Parc des Chantiers',
      number: 'Boulevard Léon Bureau',
      postalCode: '44200',
      city: 'Nantes',
      country: 'France',
      latitude: 47.208333,
      longitude: -1.562222,
    },
    phone: '+33 2 51 17 49 89',
    email: 'contact@lesmachines-nantes.fr',
    website: 'https://www.lesmachines-nantes.fr',
    type: PlaceType.MUSEUM,
    price: 0,
    city: 'Nantes',
    country: 'France',
    tags: [PlaceTag.NOLOSAY],
  },
  {
    id: 11,
    name: 'Pulperie de Chicoutimi',
    longDescription:
      "La Pulperie de Chicoutimi est un musée situé à Chicoutimi, au Québec, au Canada. Il est installé dans une ancienne usine de pâte à papier et est dédié à l'histoire de l'industrie forestière et de la pulpe au Québec. Les visiteurs peuvent explorer les expositions interactives, découvrir l'évolution de l'industrie forestière, et en apprendre davantage sur la vie des travailleurs forestiers. C'est un lieu captivant pour comprendre l'histoire de la région.",
    shortDescription: "Musée dédié à l'industrie forestière et de la pulpe au Québec.",
    picture: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Pulperie_de_Chicoutimi.jpg',
    address: {
      street: 'Rue Dubuc',
      number: '300',
      postalCode: 'G7J 4M1',
      city: 'Chicoutimi',
      country: 'Canada',
      latitude: 48.421891,
      longitude: -71.081684,
    },
    phone: '+1 418-698-3100',
    email: 'info@pulperie.com',
    website: 'https://www.pulperie.com/',
    type: PlaceType.MUSEUM,
    price: 0,
    city: 'Chicoutimi',
    country: 'Canada',
    tags: [
      PlaceTag.NOLOSAY,
      PlaceTag.DISABILITY_FRIENDLY,
      PlaceTag.DEAF_FRIENDLY,
      PlaceTag.BLIND_FRIENDLY,
      PlaceTag.OTHER,
    ],
  },
]

/**
 * @function getPlaces Get the places from the server.
 * @returns Promise of an array of places
 */
export default async function getPlaces({
  latitude,
  longitude,
  q,
  radius,
  token,
}: {
  latitude?: number
  longitude?: number
  q?: string
  radius?: number
  token: string
}): Promise<NoloPlacesJSON> {
  try {
    const queryParams: { [key: string]: string } = {}

    if (latitude !== undefined) {
      queryParams.latitude = latitude.toString()
    }
    if (longitude !== undefined) {
      queryParams.longitude = longitude.toString()
    }
    if (radius !== undefined) {
      queryParams.radius = radius.toString()
    }
    if (q !== undefined) {
      queryParams.q = q
    }

    const response = await get({
      endpoint: `/sites`,
      authorizationToken: token,
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    if (__DEV__ && responseData === 0) {
      return {
        json: PLACES,
        status: response.status,
        message: responseData.message,
      }
    }

    return {
      json: responseData,
      status: response.status,
      message: responseData.message,
    }
  } catch (error) {
    console.log("Error, couldn't get places:", error)
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

const PlacesToTranslate: ArtToTranslate[] = [
  {
    id: '1',
    uuid: '70e24df6-f8ee-594a-bb8f-de3666197fac',
    name: 'La joconde',
    picture: 'https://cdn.pariscityvision.com/library/image/5449.jpg',
    description:
      "La Joconde est un célèbre portrait de la Renaissance peint par Léonard de Vinci. Il représente une femme avec un léger sourire mystérieux, qui a captivé des générations de spectateurs. Le tableau est exposé au musée du Louvre à Paris, où il est l'une des œuvres les plus célèbres et les plus visitées.",
    RelatedPerson: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      picture: 'https://randomuser.me/api/portraits',
    },
    ItemType: {
      id: 1,
      name: "Œuvre d'art",
      ItemCategory: {
        id: 1,
        name: 'Musée',
      },
    },
  },
  {
    id: '2',
    uuid: '70e24df6-f8ee-594a-bb8f-de3666197fac',
    name: 'Nuit étoilée',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    description:
      'La Nuit étoilée est une célèbre peinture de Vincent van Gogh, réalisée en 1889. Elle représente un village endormi sous un ciel étoilé tourbillonnant. La peinture est emblématique du style unique de Van Gogh, avec ses coups de pinceau expressifs',
    RelatedPerson: {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      picture: 'https://randomuser.me/api/portraits',
    },
    ItemType: {
      id: 2,
      name: 'Centre culturel',
      ItemCategory: {
        id: 2,
        name: 'Lieu',
      },
    },
  },
  {
    id: '3',
    uuid: '70e24df6-f8ee-594a-bb8f-de3666197fac',
    name: 'Nighthawks',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/1200px-Nighthawks_by_Edward_Hopper_1942.jpg',
    description:
      "Nighthawks est une célèbre peinture d'Edward Hopper, réalisée en 1942. Elle représente un café de nuit avec des clients solitaires assis à des tables. La peinture est emblématique du style réaliste de Hopper et de son utilisation de la lumière et de l'ombre pour créer une atmosphère intrigante.",
    RelatedPerson: {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      picture: 'https://randomuser.me/api/portraits',
    },
    ItemType: {
      id: 3,
      name: 'Jardin',
      ItemCategory: {
        id: 3,
        name: 'Lieu',
      },
    },
  },
]

export async function getPlacesNeedingDescription({ token }: { token: string }): Promise<PlacesNeedingTranslationJSON> {
  try {
    const response = await get({ endpoint: '/items/video-pending', authorizationToken: token })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const responseData = await response.json()

    if (responseData.length === 0 && __DEV__) {
      return {
        json: PlacesToTranslate,
        status: response.status,
        message: response.statusText,
      }
    }

    return {
      json: responseData,
      status: response.status,
      message: response.statusText,
    }
  } catch (err) {
    console.error(err)
    throw new Error(err instanceof Error ? err.message : String(err))
  }
}
