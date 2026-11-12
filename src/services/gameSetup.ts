import { IGameSetup, IGameSetupBase, ITournamentSetup } from "./geopardyTypes";
import {
  fa6,
  faBeerMugEmpty,
  faBoltLightning,
  faChildren,
  faCity,
  faClapperboard,
  faClover,
  faCross,
  faDog,
  faDrumstickBite,
  faFaceLaughSquint,
  faFilm,
  faFlag,
  faFlaskVial,
  faGem,
  faGifts,
  faGlobe,
  faHeadphones,
  faLandmark,
  faLandmarkDome,
  faLeaf,
  faMicrophoneLines,
  faMicroscope,
  faMusic,
  faOtter,
  faP,
  faPaw,
  faPerson,
  faPersonRunning,
  faPizzaSlice,
  faQuoteLeft,
  faRadio,
  faScissors,
  faSeedling,
  faShirt,
  faStarHalfStroke,
  faTv,
  faVihara,
  faWheatAwn,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";

const getFullGameSetup = (baseSetup: IGameSetupBase): IGameSetup => {
  return {
    ...baseSetup,
    firstQuestionsGroup: baseSetup.firstQuestionsGroup.map(
      (questionsGroup) => ({
        ...questionsGroup,
        questions: questionsGroup.questions.map((question, index) => ({
          ...question,
          isAnswered: false,
          points: 100 * (index + 1),
        })),
      })
    ),
    secondQuestionsGroup: baseSetup.secondQuestionsGroup.map(
      (questionsGroup) => ({
        ...questionsGroup,
        questions: questionsGroup.questions.map((question, index) => ({
          ...question,
          isAnswered: false,
          points: 200 * (index + 1),
        })),
      })
    ),
  };
};

// PROD GAMES

export const firstGameSetupBase: IGameSetupBase = {
  finalQuestionCategory: "Zegar",
  finalQuestionText:
    "Ile razy w ciągu doby pokryją się wskazówki godzinowa i minutowa?",
  finalQuestionAnswer: "22 razy",
  firstQuestionsGroup: [
    {
      groupName: "Fragmenty",
      icon: faPaw,
      questionsGroupType: "picture",
      questions: [
        {
          text: "Jakie to zwierze? ",
          id: "11",
          answer: "Nosacz (sundajski)",
          imageUrl: "/questions/g1-fragmenty-11.jpg",
        },
        {
          text: "Jakie to zwierze? ",
          id: "12",
          answer: "Delfin",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0355/6950/0297/files/splashy-580_480x480.jpg?v=1584150900",
        },
        {
          text: "Jakie to zwierze? ",
          id: "13",
          answer: "Orangutan",
          imageUrl:
            "https://img.freepik.com/premium-photo/orangutan-s-hands-are-playing-nature_60359-614.jpg?w=2000",
        },
        {
          text: "Jakie to zwierze? ",
          id: "14",
          answer: "Wiewiórka",
          imageUrl: "/questions/g1-fragmenty-14.jpg",
        },
        {
          text: "Jakie to zwierze? ",
          id: "15",
          answer: "Panda mała (pandka ruda, panda czerwona)",
          imageUrl: "/questions/g1-fragmenty-15.jpg",
        },
      ],
    },
    {
      groupName: "Zostaw ziemniaczki",
      icon: faDrumstickBite,
      questionsGroupType: "text",
      questions: [
        {
          text: "Z jakiego mleka powstaje oscypek?",
          id: "21",
          answer: "Z mleka owczego",
        },
        {
          text: "Czym nadziany jest rogal  świętomarciński?",
          id: "22",
          answer: "Masą z białego maku (z bakaliami i orzechami)",
        },
        {
          text: "Z czego robi się kaszankę (3składniki)?",
          id: "23",
          answer: "Krew, kasza (gryczana lub jęczmienna), podroby (wątroba, płuca) i słonina",
        },
        {
          text: "Czym jest gzik? ",
          id: "24",
          answer: "Twaróg ze śmietaną i cebulą/szczypiorem (poznański, podawany z pyrami)",
        },
        {
          text: "Wymień 5 rodzajów barszczu",
          id: "25",
          answer: "Np. czerwony, biały, ukraiński, grzybowy, z kapusty (też: zabielany, zimny)",
        },
      ],
    },
    {
      groupName: "Gromowładni",
      icon: faBoltLightning,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jak nazywa się rzymski odpowiednik Zeusa?",
          id: "31",
          answer: "Jowisz",
        },
        {
          text: "Jak nazywa się słowiański gromowładny bóg?",
          id: "32",
          answer: "Perun",
        },
        {
          text: "Jaką królewną uwiódł Zeus pod postacią śnieżnobiałego byka?",
          id: "33",
          answer: "Europą",
        },
        {
          text: "Jakie zwierzęta ciągnęły rydwan Thora?",
          id: "34",
          answer: "Kozy (kozły)",
        },
        {
          text: "Jaki ptak jest atrybutem Hery, żony Zeusa?",
          id: "35",
          answer: "Paw",
        },
      ],
    },
    {
      groupName: "Janusz",
      icon: faPerson,
      questionsGroupType: "text",
      questions: [
        {
          text: "W jakim serialu czarnym charakterem był Janusz Tracz?",
          id: "41",
          answer: "Plebania",
        },
        {
          text: "Janusz Palikot oprócz bycia znanym kontrowersyjnym politykiem jest także przedsiębiorcą. Jaki jest jego główny obszar działalności? ",
          id: "42",
          answer: "Produkcja alkoholu (Ambra, Polmos Lublin, Manufaktura Piwa Wódki i Wina)",
        },
        {
          text: "Jak ma na imię i nazwisko aktor grający Stefana “Siarę” Siarzewskiego? ",
          id: "43",
          answer: "Janusz Rewiński",
        },
        {
          text: "Jaką pełną nazwę ma słynna “Małpa Janusz” z memów?",
          id: "44",
          answer: "Nosacz sundajski",
        },
        {
          text: "Czego bóstwem był jeden z najstarszych rzymskich bogów - Janus?",
          id: "45",
          answer: "Bram, drzwi i przejść, początku i końca, a także umów i sojuszy (bóg o dwóch twarzach)",
        },
      ],
    },
    {
      groupName: "Jarek",
      icon: faGlobe,
      questionsGroupType: "text",
      questions: [
        {
          text: "KAIR",
          id: "51",
          answer: "IRAK (anagram)",
        },
        {
          text: "NADIA",
          id: "52",
          answer: "DANIA (anagram)",
        },
        {
          text: "IGRANIE",
          id: "53",
          answer: "NIGERIA (anagram)",
        },
        {
          text: "BAGNO",
          id: "54",
          answer: "GABON (anagram)",
        },
        {
          text: "KADROWE",
          id: "55",
          answer: "EKWADOR (anagram)",
        },
      ],
    },
  ],
  secondQuestionsGroup: [
    {
      groupName: "Szybki numerek",
      icon: fa6,
      questionsGroupType: "text",
      questions: [
        {
          text: "Ile par chromosów ma zdrowy człowiek?",
          id: "61",
          answer: "23 pary",
        },
        {
          text: "Ile wynosi pierwiastek z 289?",
          id: "62",
          answer: "17",
        },
        {
          text: "Ile ksiąg ma stary i nowy testament?",
          id: "63",
          answer: "46 + 27 = 73 (kanon katolicki); w protestanckim 66",
        },
        {
          text: "Ile wynosi złota proporcja?",
          id: "64",
          answer: "Ok. 1,618; zalicz 1,62 (tolerancja ±0,1)",
        },
        {
          text: "Ile kobiet jest wielokrotnymi laureatkami nagrody nobla?",
          id: "65",
          answer: "Jedna: Maria Skłodowska-Curie (fizyka 1903, chemia 1911)",
        },
      ],
    },
    {
      groupName: "Memoznastwo",
      icon: faFaceLaughSquint,
      questionsGroupType: "picture",
      questions: [
        {
          text: "Jakiej rasy jest Pieseł ?",
          id: "71",
          answer: "Shiba inu",
          imageUrl:
            "https://bi.im-g.pl/im/d0/a9/e1/z14789072Q,Prawdopodobnie-najslawniejsze-zdjecie-Piesela.jpg",
        },
        {
          text: "Na co krzyczy kobieta z mema?",
          id: "72",
          answer: "Na kota",
          imageUrl: "/questions/g1-memoznastwo-72.jpg",
        },
        {
          text: "Jak się nazywa ten piosenkar?",
          id: "73",
          answer: "Drake",
          imageUrl:
            "https://i.pinimg.com/474x/88/9d/1b/889d1b3f74b7c20c845f2a2f7db2ca8a.jpg",
        },
        {
          text: "Jak nazywa się ten mem?",
          id: "74",
          answer: "Me Gusta",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_kt-mfxlZR0ERuF3H_nxu1EzCtFhAANArSdn5nC7DckXTKNdFL5H7dtCBrygqnWKNo4&usqp=CAU",
        },
        {
          text: "Jak nazywa się i co oznacza ten mem?",
          id: "75",
          answer: "Bad Luck Brian (pechowy Brian): komuś wszystko idzie źle",
          imageUrl: "/questions/g1-memoznastwo-75.jpg",
        },
      ],
    },
    {
      groupName: "Święta",
      icon: faGifts,
      questionsGroupType: "text",
      questions: [
        {
          text: "Pod jaką rośliną dajemy sobie świątecznego buziaka?",
          id: "81",
          answer: "Pod jemiołą",
        },
        {
          text: "Czym jest kutia?",
          id: "82",
          answer: "Świąteczny deser z pszenicy, maku, miodu i bakalii",
        },
        {
          text: "W którym miesiącu roku obchodzi się Święta Bożego Narodzenia w Kościele Prawosławnym?",
          id: "83",
          answer: "W styczniu (7 stycznia, kalendarz juliański)",
        },
        {
          text: "W większości Poslki prezenty przynosi Święty Mikołaj. Wymień 2 inne postaci, które przynoszą prezenty zgodnie z tradycją w różnych regionach Polskii",
          id: "84",
          answer: "Np. Gwiazdor, Dziadek Mróz, Dzieciątko, Aniołek, Gwiazdka",
        },
        {
          text: "Każdy zna Rudolfa Czerwononosego. Podaj imię jednego innego renifera z zaprzęgu Świętego Mikołaja",
          id: "85",
          answer: "Np. Fircyk, Tancerz, Pyszałek, Złośnik, Kometek, Amorek, Profesorek, Błyskawiczny (ang. Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner, Blitzen)",
        },
      ],
    },
    {
      groupName: "Tablica Mendelejeva",
      icon: faFlaskVial,
      questionsGroupType: "text",
      questions: [
        {
          text: "Z jakiego pierwiastka najczęściej robi się baterie/akumulatory?",
          id: "91",
          answer: "Lit",
        },
        {
          text: "Z jakiego pierwiastka zbudowany jest diament?",
          id: "92",
          answer: "Węgiel",
        },
        {
          text: "Jaki metal topi się w ręce?",
          id: "93",
          answer: "Gal",
        },
        {
          text: "Jakim pierwiastkiem można się zatruć jeśli jemy zbyt dużo ryb?",
          id: "94",
          answer: "Rtęć",
        },
        {
          text: "Jaki pierwiastek w formie gazowej znajduje się w żarówce i chroni wino przed utlenieniem?",
          id: "95",
          answer: "Argon",
        },
      ],
    },
    {
      groupName: "Guma Turbo",
      icon: faRadio,
      questionsGroupType: "sound",
      questions: [
        {
          text: "Jak nazywa się wykonawca tej piosenki?",
          id: "101",
          soundUrl:
            "https://drive.google.com/file/d/1GHbFELDcMQnJFajV2-gK1FH6ONfY3H4k/preview",
        },
        {
          text: "Jak nazywa się ten zespół?",
          id: "102",
          soundUrl:
            "https://drive.google.com/file/d/1u1Dh3xadN4H3grocR9GlH2YXJ6qUPp76/preview",
        },
        {
          text: "Jak nazywa się wykonawca tej piosenki?",
          id: "103",
          soundUrl:
            "https://drive.google.com/file/d/14diZZ4APVC1orHrs1tDuh0Cf3V7eot7Y/preview",
        },
        {
          text: "Jak nazywa się wokalista tego zespolu?",
          id: "104",
          soundUrl:
            "https://drive.google.com/file/d/10k76cpnelC5CE0O7-zV2BX_-RPdyurFq/preview",
        },
        {
          text: "Jak tytuł ma ta piosenka?",
          id: "105",
          soundUrl:
            "https://drive.google.com/file/d/1tvSPDpPHlClCWaJyM8xGrFpsXW9hdDDE/preview",
        },
      ],
    },
  ],
};

export const secondGameSetupBase: IGameSetupBase = {
  finalQuestionCategory: "Stolica",
  finalQuestionText:
    "Jakie miasto jest najdalej na południe wysuniętą stolicą państwa w Unii Europejskiej?",
  finalQuestionAnswer: "Nikozja (Cypr)",
  firstQuestionsGroup: [
    {
      groupName: "Flagi",
      icon: faFlag,
      questionsGroupType: "picture",
      questions: [
        {
          text: "Jakiego kraju to flaga?",
          id: "11",
          answer: "Rumunia",
          imageUrl:
            "https://media.istockphoto.com/photos/romania-flag-picture-id1178991990?k=20&m=1178991990&s=612x612&w=0&h=k86qoTqulQhryYbQJygwUpgzhGDWpvdDjjzcAu8HJFA=",
        },
        {
          text: "Jakiego kraju to flaga?",
          id: "12",
          answer: "Słowenia",
          imageUrl:
            "https://img.freepik.com/premium-wektory/flaga-slowenii-wiejacy-wiatr-czesc-serii-machac-flaga-slowenii_126712-286.jpg",
        },
        {
          text: "Jakiego kraju to flaga?",
          id: "13",
          answer: "Kolumbia",
          imageUrl:
            "https://media.istockphoto.com/photos/colombias-flag-picture-id508515841?k=20&m=508515841&s=612x612&w=0&h=fQ7fexfVO7hp2nmRUmvJcv6fm37aC0UaYnDWkbc5x_o=",
        },
        {
          text: "Jakiego kraju to flaga?",
          id: "14",
          answer: "Indonezja",
          imageUrl:
            "https://media.istockphoto.com/photos/indonesia-flag-picture-id479423455?k=20&m=479423455&s=612x612&w=0&h=GU9rSDjhufNw-pYbU3fczh5bIltKbEpHMvZQ_p0vfFU=",
        },
        {
          text: "Jakiego kraju to flaga?",
          id: "15",
          answer: "Somalia",
          imageUrl:
            "https://media.istockphoto.com/photos/image-of-the-flag-somalia-series-africa-picture-id1161840605?k=20&m=1161840605&s=612x612&w=0&h=vUHkujN_Rw8qheOsWTCqrOEtV8mH7XbdZb5uUHq7IMo=",
        },
      ],
    },
    {
      groupName: "Smaki świata",
      icon: faPizzaSlice,
      questionsGroupType: "text",
      questions: [
        {
          text: "Wymień co najmniej 5 składników “Full English Breakfast”",
          id: "21",
          answer: "Np. bekon, kiełbaski, jajka, fasolka, pomidor, pieczarki, black pudding, tosty (też hash browns)",
        },
        {
          text: "Czym jest chzaczapuri i z jakiego kraju pochodzi?",
          id: "22",
          answer: "Zapiekany placek z serem (i jajkiem); Gruzja",
        },
        {
          text: "Który kolor potrawy curry jest najpikantniejszy?",
          id: "23",
          answer: "Zielone (tajskie zielone curry)",
        },
        {
          text: "Czym są enchiladas i z jakiego kraju pochodzą? ",
          id: "24",
          answer: "Zawijane tortille kukurydziane z nadzieniem, zapiekane w sosie chili; Meksyk",
        },
        {
          text: "Czym są dolmy i z jakiego kraju pochodzą?",
          id: "25",
          answer: "Liście winorośli nadziewane ryżem (i mięsem); Turcja (popularne też w Grecji)",
        },
      ],
    },
    {
      groupName: "Serialowe Emoji",
      icon: faTv,
      questionsGroupType: "text",
      questions: [
        {
          text: "🦑 🕹 ",
          id: "31",
          answer: "Squid Game (Gra w kałamarnicę)",
        },
        {
          text: "🍆🍑👩‍🏫📚",
          id: "32",
          answer: "Sex Education",
        },
        {
          text: "🏠♠️♥️♣️♦️ ",
          id: "33",
          answer: "House of Cards",
        },
        {
          text: "🎲 🚽",
          id: "34",
          answer: "Gra o tron",
        },
        {
          text: "👨‍🔬💉🔵💊",
          id: "35",
          answer: "Breaking Bad",
        },
      ],
    },
    {
      groupName: "Gwiazdeczki",
      icon: faStarHalfStroke,
      questionsGroupType: "text",
      questions: [
        {
          text: "Ile czasu zajmuje doatrcie światła z słońca do ziemi?",
          id: "41",
          answer: "Ok. 8 minut (8 min 20 s)",
        },
        {
          text: "Jak ma na imię i nazwisko Doda?",
          id: "42",
          answer: "Dorota Rabczewska",
        },
        {
          text: "Jaka gwiazda jest najbliżej ziemi nie licząc słońca?",
          id: "43",
          answer: "Proxima Centauri",
        },
        {
          text: "Z ilu gwiazd składa się duży wóz? ",
          id: "44",
          answer: "Z 7",
        },
        {
          text: "Jaka galaktyka jest naszym najbliższym sąsiadem?",
          id: "45",
          answer: "Galaktyka Andromedy (najbliższa duża); ściśle: karłowate, np. Karzeł Wielkiego Psa",
        },
      ],
    },
    {
      groupName: "Narośli",
      icon: faSeedling,
      questionsGroupType: "text",
      questions: [
        {
          text: "JUTA",
          id: "51",
          answer: "TUJA (anagram)",
        },
        {
          text: "RZEP",
          id: "52",
          answer: "PERZ (anagram)",
        },
        {
          text: "MANILA",
          id: "53",
          answer: "MALINA (anagram)",
        },
        {
          text: "KALINOWA",
          id: "54",
          answer: "KONWALIA (anagram)",
        },
        {
          text: "RENKLODA",
          id: "55",
          answer: "KOLENDRA (anagram)",
        },
      ],
    },
  ],
  secondQuestionsGroup: [
    {
      groupName: "Cuda Europy",
      icon: faLandmarkDome,
      questionsGroupType: "picture",
      questions: [
        {
          text: "Co to za budynek?",
          id: "61",
          answer: "Luwr (Paryż)",
          imageUrl:
            "https://media.cntraveler.com/photos/57d961ce3e6b32bf25f5ad0f/16:9/w_2560,c_limit/most-beautiful-paris-louvre-GettyImages-536267205.jpg",
        },
        {
          text: "Co to za budynek?",
          id: "62",
          answer: "Zamek Neuschwanstein (Bawaria)",
          imageUrl:
            "https://www.travelandleisure.com/thmb/umcoSMJygYyG5OIYDdBPgnrJGLc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/01-neuschwanstein-castle-bavaria-NEUSCHWANSTEIN0417-273a040698f24fc1ac22e717bb3f1f0c.jpg",
        },
        {
          text: "Co to za budynek?",
          id: "63",
          answer: "Katedra w Mediolanie (Duomo di Milano)",
          imageUrl: "/questions/g2-cuda-europy-63.jpg",
        },
        {
          text: "Co to za budynek?",
          id: "64",
          answer: "Sobór Wasyla Błogosławionego / katedra św. Bazylego (Moskwa)",
          imageUrl: "/questions/g2-cuda-europy-64.jpg",
        },
        {
          text: "Co to za budynek?",
          id: "65",
          answer: "Hagia Sophia (Stambuł)",
          imageUrl: "https://muze.gen.tr/images/hagia_sophia_mosque.jpg",
        },
      ],
    },
    {
      groupName: "P",
      icon: faP,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jak nazwiemy podwyższenie pomnika?",
          id: "71",
          answer: "Piedestał (też: postument)",
        },
        {
          text: "Jak nazwiemy wyrażenie brzmiące tak samo czytane od lewej do prawej i od prawej do lewej?",
          id: "72",
          answer: "Palindrom",
        },
        {
          text: "Jakim przymiotnikiem określimy osobę przesadnie wstydliaw, gorszącą się sprawami seksu? ",
          id: "73",
          answer: "Pruderyjny",
        },
        {
          text: "Jak nazwiemy kontakty seksualne pozbawione więzi uczuciowych, podejmowane z przypadkowymi, często zmienianymi partneram?",
          id: "74",
          answer: "Promiskuityzm",
        },
        {
          text: "Jak nazwiemy uroczysty tekst pochwalny, sławiący jakąś osobę, czyn lub wydarzenie?",
          id: "75",
          answer: "Panegiryk (także: pean)",
        },
      ],
    },
    {
      groupName: "00",
      icon: faMusic,
      questionsGroupType: "sound",
      questions: [
        {
          text: "Jak nazywa się wykonawca tego kawałka?",
          id: "81",
          soundUrl:
            "https://drive.google.com/file/d/1r9PMayf4Xum0EM9szSJn95kTgomPRIfz/preview",
        },
        {
          text: "Jak nazywa się wykonawca i tytuł tej piosenki?",
          id: "82",
          soundUrl:
            "https://drive.google.com/file/d/18HvlPHemnB4KQ9oQ27TadVZRcXyEim4q/preview",
        },
        {
          text: "Jaki duet zaśpiewał tą piosenkę?",
          id: "83",
          soundUrl:
            "https://drive.google.com/file/d/12QY-oWcQBaDWG5jac9qIORFe7EMVOASG/preview",
        },
        {
          text: "Jaki tytuł ma ta piosneka i kto ją wykonuje?",
          id: "84",
          soundUrl:
            "https://drive.google.com/file/d/1rvk0o4s5Xuly-KimFg44-_sn4y05qoH6/preview",
        },
        {
          text: "W żonę jakiego projektanta mody wcieliła się ta piosenkarka?",
          id: "85",
          soundUrl:
            "https://drive.google.com/file/d/1b0O_YQ_zr-J3hgEIMy1ZCUjscGlx454i/preview",
        },
      ],
    },
    {
      groupName: "Chiński zodiak",
      icon: faVihara,
      questionsGroupType: "text",
      questions: [
        {
          text: "Podczas pandemii której choroby, zarazki przenosiły się ze szczurów na ludzi? ",
          id: "91",
          answer: "Dżumy",
        },
        {
          text: "Produkcja jakiego oleju zabija Orangutanny?",
          id: "92",
          answer: "Oleju palmowego",
        },
        {
          text: "Jak nazywał się smok z filmu Mulan?",
          id: "93",
          answer: "Mushu",
        },
        {
          text: "Co było celem “Inwazji w Zatoce Świń” w 1961 roku?",
          id: "94",
          answer: "Obalenie rządu Fidela Castro na Kubie",
        },
        {
          text: "Jak nazwiemy wykastrowanego i specjlanie utuczonego młodego koguta?",
          id: "95",
          answer: "Kapłon",
        },
      ],
    },
    {
      groupName: "Karaty",
      icon: faGem,
      questionsGroupType: "text",
      questions: [
        {
          text: "Czym jest tombak?",
          id: "101",
          answer: "Stop miedzi z cynkiem (imitacja złota)",
        },
        {
          text: "Jaka jest różnica pomiędzy brylantem a diamentem?",
          id: "102",
          answer: "Brylant to diament oszlifowany szlifem brylantowym",
        },
        {
          text: "Jakiego kamienia szlachetnego użuwał pierwszy działający laser?",
          id: "103",
          answer: "Rubinu",
        },
        {
          text: "Ile gram to jeden karat?",
          id: "104",
          answer: "0,2 g",
        },
        {
          text: "Gdzie znajduje się największy diament - Cullian I, Wielka Gwiazda Afryki?",
          id: "105",
          answer: "W brytyjskim berle królewskim (Klejnoty Koronne, Tower w Londynie)",
        },
      ],
    },
  ],
};

export const thirdGameSetupBase: IGameSetupBase = {
  finalQuestionCategory: "Góry",
  finalQuestionText:
    "Jak nazywa się ośmiotysięcznik, którego nazwa wywodzi się z sanskrytu i znaczy 'Naga Góra'?",
  finalQuestionAnswer: "Nanga Parbat",
  firstQuestionsGroup: [
    {
      groupName: "Kaszojady",
      icon: faChildren,
      questionsGroupType: "picture",
      questions: [
        {
          text: "Kto to?",
          id: "11",
          answer: "Rihanna",
          imageUrl:
            "https://en.kidsmusic.info/photo/rihanna-fenty/rihanna-fenty-4c46516c-44f4-42da-a185-3efccd80e438.jpg?size=0x960",
        },
        {
          text: "Kto to?",
          id: "12",
          answer: "Freddie Mercury",
          imageUrl:
            "https://scontent.fosl1-1.fna.fbcdn.net/v/t1.18169-9/12295313_950155968398266_7484014228676456703_n.png?_nc_cat=110&ccb=1-7&_nc_sid=9267fe&_nc_ohc=G0grekpO6HIAX9fmahj&_nc_ht=scontent.fosl1-1.fna&oh=00_AfBIjTbIVqIt0Cto0Rfkami_RJPEhp4tkWysQBo-wZ49Ug&oe=6399C173",
        },
        {
          text: "Kto to?",
          id: "13",
          answer: "Katy Perry",
          imageUrl:
            "https://i.pinimg.com/564x/d8/6f/f3/d86ff3136a33c918ee5f582c8fc9df00.jpg",
        },
        {
          text: "Kto to?",
          id: "14",
          answer: "Michael Jackson",
          imageUrl: "/questions/g3-kaszojady-14.jpg",
        },
        {
          text: "Kto to?",
          id: "15",
          answer: "Adele",
          imageUrl: "/questions/g3-kaszojady-15.jpg",
        },
      ],
    },
    {
      groupName: "Filmowe Emoji",
      icon: faFilm,
      questionsGroupType: "text",
      questions: [
        {
          text: "🕷🙍‍♂️",
          id: "21",
          answer: "Spider-Man",
        },
        {
          text: "🚢 🧊",
          id: "22",
          answer: "Titanic",
        },
        {
          text: "🐴 🩸",
          id: "23",
          answer: "Ojciec chrzestny",
        },
        {
          text: "😈👢",
          id: "24",
          answer: "Diabeł ubiera się u Prady",
        },
        {
          text: "🗡🏹🪓",
          id: "25",
          answer: "Władca Pierścieni: Drużyna Pierścienia",
        },
      ],
    },
    {
      groupName: "Cytaty ze shreka",
      icon: faQuoteLeft,
      questionsGroupType: "text",
      questions: [
        {
          text: "'Nie, nie guziczki! Nie lukrowane guziczki!'",
          id: "31",
          answer: "Ciastek (Piernik)",
        },
        {
          text: "'Błagam nie, ja nie chcę na opał!'",
          id: "32",
          answer: "Pinokio",
        },
        {
          text: "'Z moim mózgiem i Twoim gabarytem, cała droga nasza.'",
          id: "33",
          answer: "Osioł",
        },
        {
          text: "'Julio Iglesias! FC Barcelona!'",
          id: "34",
          answer: "Kot w Butach",
        },
        {
          text: "'Robią sobie rękawiczki z ludzkiej skóry i breloczki z wątroby'",
          id: "35",
          answer: "Shrek",
        },
      ],
    },
    {
      groupName: "60s",
      icon: faHeadphones,
      questionsGroupType: "sound",
      questions: [
        {
          text: "Jak nazywa się ten zespół?",
          id: "41",
          soundUrl:
            "https://drive.google.com/file/d/1dBVAIhbz1TKQEtJAQ-aMqfk2IPZyI502/preview",
        },
        {
          text: "Jak nazywa się ten zespół?",
          id: "42",
          soundUrl:
            "https://drive.google.com/file/d/1otZOEW9_V6NpfXzqNP4D5EHq0HHRM6gO/preview",
        },
        {
          text: "Jak nazywa się ten zespół?",
          id: "43",
          soundUrl:
            "https://drive.google.com/file/d/1AFs7rHrAJrCHZppQA4B7ZcPH8DiNAUhH/preview",
        },
        {
          text: "Jak nazywa się ten zespół?",
          id: "44",
          soundUrl:
            "https://drive.google.com/file/d/1BpRi1aM4tLTY65fTsfOkAO13iF9PSrOn/preview",
        },
        {
          text: "Jak nazywa się ten zespół?",
          id: "45",
          soundUrl:
            "https://drive.google.com/file/d/1hVu6q1TT2EOpzS4dfYtO0jOpE32mhEGz/preview",
        },
      ],
    },
    {
      groupName: "Odzianie",
      icon: faShirt,
      questionsGroupType: "text",
      questions: [
        {
          text: "Na jakie spodnie potocznie mówi się Szwedy?",
          id: "51",
          answer: "Na dzwony",
        },
        {
          text: "Czym jest toczek?",
          id: "52",
          answer: "Mały okrągły kapelusik bez ronda (także kask jeździecki)",
        },
        {
          text: "Czym jest mufka?",
          id: "53",
          answer: "Futrzany rękaw do ogrzewania dłoni",
        },
        {
          text: "Czym były Pepegi?",
          id: "54",
          answer: "Płócienne tenisówki z PRL (nazwa od PPG: Polski Przemysł Gumowy)",
        },
        {
          text: "Czym był dublet?",
          id: "55",
          answer: "Obcisły męski kaftan z rękawami (XIV–XVII w.)",
        },
      ],
    },
  ],
  secondQuestionsGroup: [
    {
      groupName: "Fryzury",
      icon: faScissors,
      questionsGroupType: "picture",
      questions: [
        {
          text: "Czyja to fryzura?",
          id: "61",
          answer: "Michał Wiśniewski",
          imageUrl: "/questions/g3-fryzury-61.jpg",
        },
        {
          text: "Czyja to fryzura?",
          id: "62",
          answer: "Magda Gessler",
          imageUrl: "/questions/g3-fryzury-62.jpg",
        },
        {
          text: "Czyja to fryzura?",
          id: "63",
          answer: "Albert Einstein",
          imageUrl: "/questions/g3-fryzury-63.jpg",
        },
        {
          text: "Czyja to fryzura?",
          id: "64",
          answer: "Billie Eilish",
          imageUrl: "/questions/g3-fryzury-64.jpg",
        },
        {
          text: "Czyja to fryzura?",
          id: "65",
          answer: "Cristiano Ronaldo",
          imageUrl: "/questions/g3-fryzury-65.jpg",
        },
      ],
    },
    {
      groupName: "Sport?",
      icon: faPersonRunning,
      questionsGroupType: "text",
      questions: [
        {
          text: "Ile osób potrzeba do zagrania w brydża?",
          id: "71",
          answer: "4",
        },
        {
          text: "Jak na imię i nazwisko ma najbardziej utytuowany polski żużlowiec? ",
          id: "72",
          answer: "Tomasz Gollob; uznaj też Bartosza Zmarzlika (więcej tytułów mistrza świata)",
        },
        {
          text: "W jakim e-sporcie był słynny Marcin “Jankos” Jankowski na poziomie międzynarodowym?",
          id: "73",
          answer: "League of Legends",
        },
        {
          text: "Jak profesjonalnie nazywa się “czajnik” popychany w curlingu?",
          id: "74",
          answer: "Kamień (curlingowy)",
        },
        {
          text: "Jak nazywa się popularny wśród studentów USA i Kanady sport w którym z pomocą specjalnej rakiety,przypominającej siatkę na motyle, należy umieścić piłkę w bramce przeciwnika?",
          id: "75",
          answer: "Lacrosse",
        },
      ],
    },
    {
      groupName: "Słowianie",
      icon: faWheatAwn,
      questionsGroupType: "text",
      questions: [
        {
          text: "Z czym związane jest słowiańśkie święto - Noc Kupały?",
          id: "81",
          answer: "Z letnim przesileniem (najkrótsza noc w roku): ogień, woda, miłość",
        },
        {
          text: "Czego bogiem był Swarożyc?",
          id: "82",
          answer: "Ognia (i słońca)",
        },
        {
          text: "Ile twarzy miał bóg Świętowit?",
          id: "83",
          answer: "4",
        },
        {
          text: "Kto stworzył świat według mitologii słowiańskiej",
          id: "84",
          answer: "Białobóg i Czarnobóg (w innych wersjach Swaróg lub Rod)",
        },
        {
          text: "Czym były Ubożęta",
          id: "85",
          answer: "Opiekuńcze duszki domowe (podobne do krasnoludków), przynoszące dobrobyt",
        },
      ],
    },
    {
      groupName: "Na Zielono",
      icon: faClover,
      questionsGroupType: "text",
      questions: [
        {
          text: "Co jest zielone w piosence Zenka Martyniuka?",
          id: "91",
          answer: "Oczy (\"Przez twe oczy zielone\")",
        },
        {
          text: "Jak nazywa się barwnik fotosyntetyczny roślin nadający im zielony kolor?",
          id: "92",
          answer: "Chlorofil",
        },
        {
          text: "Jaki polski poeata był twórcą 'Teatrzyku Zielona Gęś'?",
          id: "93",
          answer: "Konstanty Ildefons Gałczyński",
        },
        {
          text: "Jaka jest potoczna nazwa chrześcijańskiego święta Zesłania Ducha Świętego?",
          id: "94",
          answer: "Zielone Świątki",
        },
        {
          text: "W jakim filmi z 1999 r. Tom Hanks grał strażnika więziennego?",
          id: "95",
          answer: "Zielona mila",
        },
      ],
    },
    {
      groupName: "R jak Roślina",
      icon: faLeaf,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jaką roślinę nazywamy królową kwiatów?",
          id: "101",
          answer: "Róża",
        },
        {
          text: "Jaka roślina jest podstawą wyżywienia ok. 1/3 ludności świata?",
          id: "102",
          answer: "Ryż",
        },
        {
          text: "Jaka roślina oleista ma żółte kwiaty?",
          id: "103",
          answer: "Rzepak",
        },
        {
          text: "Jaką roślinę inaczej nazwiemy azalią lub różanecznikiem?",
          id: "104",
          answer: "Rododendron",
        },
        {
          text: "Wyciąg z kwiatów jakiej rośliny ma działanie przeciwzapalne i jest nazywany azulanem?",
          id: "105",
          answer: "Rumianek",
        },
      ],
    },
  ],
};

export const finalGameSetupBase: IGameSetupBase = {
  finalQuestionText:
    "Jest to jedyne państwo, któremu od odzyskania niepodległości Polska wypowiedziała wojnę. Wyzwania nie przyjęto. O jakim państwie mowa?",
  finalQuestionAnswer: "Japonia (11 grudnia 1941, rząd RP na uchodźstwie; Japonia nie przyjęła wypowiedzenia)",
  finalQuestionCategory: "Historia XX Wieku",
  firstQuestionsGroup: [
    {
      groupName: "Gryzonie",
      icon: faOtter,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jakie gryzonie budują żeremia?",
          id: "71",
          answer: "Bobry",
        },
        {
          text: "Jakiego gryzonia, zapadającego w zimowy sens, można spotkać w Tatrach?",
          id: "72",
          answer: "Świstak",
        },
        {
          text: "Na jakim kontynencie żyje największy gryzoń - kapibara?",
          id: "73",
          answer: "W Ameryce Południowej",
        },
        {
          text: "Jaką inną nazwę nosi Kawia Domowa? ",
          id: "74",
          answer: "Świnka morska",
        },
        {
          text: "Jak nazywa się podobny do bobra gryzoń nazywany szczurem wodnym i pochodzący z Ameryki Południowej?",
          id: "75",
          answer: "Nutria (bobroszczur). Uwaga: piżmak pochodzi z Ameryki Płn.",
        },
      ],
    },
    {
      groupName: "Cień Disneya",
      icon: faClapperboard,
      questionsGroupType: "picture",
      questions: [
        {
          text: "Kto to?",
          id: "81",
          answer: "Mushu (Mulan)",
          imageUrl: "/questions/final-cien-disneya-81.png",
        },
        {
          text: "Kto to?",
          id: "82",
          answer: "Dżafar (Aladyn)",
          imageUrl: "/questions/final-cien-disneya-82.png",
        },
        {
          text: "Kto to?",
          id: "83",
          answer: "Megara (Herkules)",
          imageUrl: "/questions/final-cien-disneya-83.png",
        },
        {
          text: "Kto to?",
          id: "84",
          answer: "Gaston (Piękna i Bestia)",
          imageUrl: "/questions/final-cien-disneya-84.png",
        },
        {
          text: "Kto to?",
          id: "85",
          answer: "Nani (Lilo i Stitch)",
          imageUrl: "/questions/final-cien-disneya-85.png",
        },
      ],
    },
    {
      groupName: "Intercontinental Bajers",
      icon: faDog,
      questionsGroupType: "text",
      questions: [
        {
          text: "Co znaczy po hiszpańsku Amiga?",
          id: "91",
          answer: "Przyjaciółka",
        },
        {
          text: "Co znaczą tytuły piosenek niemieckiego zespołu Rammstein - “Du Hast” i “Sonne”?",
          id: "92",
          answer: "\"Ty masz\" (gra słów z \"nienawidzisz\") i \"Słońce\"",
        },
        {
          text: "Co znaczy łacińskie “Sic!”?",
          id: "93",
          answer: "\"Tak\" (tak było napisane, tak w oryginale)",
        },
        {
          text: "Co oznacza francuskie “Comment ça va?” w znanej piosence “Komo sawa? Komsi komsi komsa” ?",
          id: "94",
          answer: "\"Jak się masz?\" / \"Co słychać?\"",
        },
        {
          text: "Co znaczy “Lupus in fabula” po łacinie ?",
          id: "95",
          answer: "\"Wilk w bajce\": o wilku mowa",
        },
      ],
    },
    {
      groupName: "45-89",
      icon: faCity,
      questionsGroupType: "text",
      questions: [
        {
          text: "Co oznacza skrót PZPR?",
          id: "41",
          answer: "Polska Zjednoczona Partia Robotnicza",
        },
        {
          text: "Które województwa wchodzą w skład ziem odzyskanych po II WŚ? (Wymień 3)",
          id: "42",
          answer: "Zachodniopomorskie, lubuskie, dolnośląskie, opolskie, warmińsko-mazurskie (częściowo pomorskie i śląskie)",
        },
        {
          text: "Jakie 3 organy brały udział w obradach okrągłego stołu? ",
          id: "43",
          answer: "Władze PRL, opozycja demokratyczna (Solidarność), Kościół",
        },
        {
          text: "Jaki był powód zamieszek w czerwcu 1976 w Radomiu?",
          id: "44",
          answer: "Podwyżki cen żywności",
        },
        {
          text: "Jakie zadanie miały sowieckie brygady trofiejne?",
          id: "45",
          answer: "Grabież dóbr: wywóz do ZSRR maszyn, fabryk, surowców, dzieł sztuki",
        },
      ],
    },
    {
      groupName: "Procenty",
      icon: faBeerMugEmpty,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jak pije się Tequile? ",
          id: "51",
          answer: "Liże się sól, pije shota, zagryza limonką",
        },
        {
          text: "Jaki alkohol pija James Bond?",
          id: "52",
          answer: "Martini z wódką (wstrząśnięte, nie zmieszane)",
        },
        {
          text: "Jaki alkohol piją Grecy podczas stypy?",
          id: "53",
          answer: "Metaxa (koniak/brandy)",
        },
        {
          text: "Jak nazwiemy wzmacniane wino z winogron zbieranych w dole reki Douro?",
          id: "54",
          answer: "Porto",
        },
        {
          text: "Czym jest kusztyk/kulawka?",
          id: "55",
          answer: "Kieliszek bez stopki (nie da się go odstawić, trzeba wypić)",
        },
      ],
    },
  ],
  secondQuestionsGroup: [
    {
      groupName: "Liderzy",
      icon: faLandmark,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jaka postać została zakazana z powodu żartów z prezydenta Chin, Xi Jinpinga?",
          id: "31",
          answer: "Kubuś Puchatek",
        },
        {
          text: "Który prezydent ożenił się ze swoją 24 lata starszą nauczycielką z liceum jezuickiego?",
          id: "32",
          answer: "Emmanuel Macron",
        },
        {
          text: "Jaką funkcję pełnił Władmir Putin przez pierwsze 15 lat swojej pracy?",
          id: "33",
          answer: "Oficer KGB",
        },
        {
          text: "W 2018 roku następca tronu pewnego kraju zlecił morderstwo dziennikarza w konsulacie teog kraju na terenie turcji. O jakim kraju mowa?",
          id: "34",
          answer: "Arabia Saudyjska",
        },
        {
          text: "Dwaj bracia, rządzący egzotycznym krajem jeden po drugim. O jakim kraju mowa?",
          id: "35",
          answer: "Kuba (Fidel i Raúl Castro)",
        },
      ],
    },
    {
      groupName: "Święci",
      icon: faCross,
      questionsGroupType: "text",
      questions: [
        {
          text: "Do którego świętego modlimy się w sprawie rzeczy zagubionych ?",
          id: "71",
          answer: "Św. Antoni (z Padwy)",
        },
        {
          text: "Jak nazywa się święty będący patronem zwierząt ?",
          id: "72",
          answer: "Św. Franciszek z Asyżu",
        },
        {
          text: "Jakie now święto powstało dzięki św. Faustynie Kowalskiej?",
          id: "73",
          answer: "Święto (Niedziela) Miłosierdzia Bożego",
        },
        {
          text: "Do jakiego zakonu należał św. Maksymilian Kolbe?",
          id: "74",
          answer: "Franciszkanów (konwentualnych)",
        },
        {
          text: "Jak nazywa się patron strażaków?",
          id: "75",
          answer: "Św. Florian",
        },
      ],
    },
    {
      groupName: "Domowy Mikroskop",
      icon: faMicroscope,
      questionsGroupType: "picture",
      questions: [
        {
          text: "Znajdziemy to w łazience.",
          id: "81",
          answer: "Szczoteczka (do zębów)",
          imageUrl: "/questions/final-mikroskop-81.jpg",
        },
        {
          text: "Znajdziemy to w kuchni.",
          id: "82",
          answer: "Sól",
          imageUrl: "/questions/final-mikroskop-82.jpg",
        },
        {
          text: "Znajdziemy to w garderobie/ganku.",
          id: "83",
          answer: "Rzepy (zapięcie na rzep)",
          imageUrl: "/questions/final-mikroskop-83.jpg",
        },
        {
          text: "Znajdziemy to w sypialni.",
          id: "84",
          answer: "Roztocza kurzu",
          imageUrl: "/questions/final-mikroskop-84.jpg",
        },
        {
          text: "Znajdziey to w salonie.",
          id: "85",
          answer: "Płyta winylowa",
          imageUrl: "/questions/final-mikroskop-85.jpg",
        },
      ],
    },
    {
      groupName: "Mądrości",
      icon: faMicrophoneLines,
      questionsGroupType: "sound",
      questions: [
        {
          text: "Kto to powiedział?",
          id: "91",
          soundUrl:
            "https://drive.google.com/file/d/1--2K0k11YDB4xz-6moDLp8bqH2Q-rEf5/preview",
        },
        {
          text: "Kto to powiedział?",
          id: "92",
          soundUrl:
            "https://drive.google.com/file/d/1dd7cBWriY1tV0r7thVJowkCNuGM3MzZj/preview",
        },
        {
          text: "Kto to powiedział?",
          id: "93",
          soundUrl:
            "https://drive.google.com/file/d/1rRoV8KOQxFTyueS59O76fx7hIOgg81Qn/preview",
        },
        {
          text: "Kto to powiedział?",
          id: "94",
          soundUrl:
            "https://drive.google.com/file/d/1gDdRXHw0CV4cHXzj94Cisk9CrV08jI6p/preview",
        },
        {
          text: "Kiedy to powiedziano?",
          id: "95",
          soundUrl:
            "https://drive.google.com/file/d/14rBlC4ad_koJhopkAIIYGUzWUgxsbrNp/preview",
        },
      ],
    },
    {
      groupName: "Boskie Trunki",
      icon: faWineGlass,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jakim trunkiem raczą się bogowie Olimpijscy?",
          id: "101",
          answer: "Nektarem (ambrozja to pokarm)",
        },
        {
          text: "Jak nazywa się rzymski odpowiednik Dionizosa?",
          id: "102",
          answer: "Bachus",
        },
        {
          text: "Z jakimi mitycznymi/legendarnymi postaciami związany jest Złoty Graal?",
          id: "103",
          answer: "Z królem Arturem i rycerzami Okrągłego Stołu (kielich z Ostatniej Wieczerzy)",
        },
        {
          text: "Jak nazywał się wesoły mnich, lubujący się w piwie i miodzie pitnym, współtowarzysz Robin Hooda?",
          id: "104",
          answer: "Brat (Braciszek) Tuck",
        },
        {
          text: "Jak nazywała się żona Dionizosa?",
          id: "105",
          answer: "Ariadna",
        },
      ],
    },
  ],
};

export const firstGameSetup = getFullGameSetup(firstGameSetupBase);
export const secondGameSetup = getFullGameSetup(secondGameSetupBase);
export const thirdGameSetup = getFullGameSetup(thirdGameSetupBase);
export const finalGameSetup = getFullGameSetup(finalGameSetupBase);

export const tournamentSetup: ITournamentSetup = {
  gamesSetups: [firstGameSetup, secondGameSetup, thirdGameSetup],
  finalGameSetup: finalGameSetup,
};
