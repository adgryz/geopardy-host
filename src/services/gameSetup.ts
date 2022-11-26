import { IGameSetup, IGameSetupBase, ITournamentSetup } from "./geopardyTypes";
import { faMicrophone, faSpa } from "@fortawesome/free-solid-svg-icons";

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

// export const firstGameSetupBase: IGameSetupBase = {
//   finalQuestion: "Wymień 3 noblistów po 2000 roku.",
//   firstQuestionsGroup: [
//     {
//       groupName: "Sławne Głosy",
//       icon: faMicrophone,
//       questionsGroupType: "sound",
//       questions: [
//         {
//           text: "Kto to spiewa?",
//           id: "11",
//           soundUrl: "https://www.computerhope.com/jargon/m/example.mp3",
//         }, // 15
//         {
//           text: "Co się dzieje gdy zawodnik dostanie czerwoną kartkę?",
//           id: "12",
//         }, // Przeciwnicy dostają punkt
//         { text: "Ile zmian może wykonać trener podczas seta?", id: "13" }, // 6
//         {
//           text: "Na jakiej wysokości znajduje się górna taśma w siatkówce kobiet?",
//           id: "14",
//         }, // 2.24
//         { text: "Do ilu punktów kiedyś grano seta?", id: "15" }, // 21
//       ],
//     },
//     {
//       groupName: "Kwiatki",
//       icon: faSpa,
//       questionsGroupType: "text",
//       questions: [
//         {
//           text: "Jak nazywa się kwiat, którego nazwa jest jak nazwa broni?",
//           id: "21",
//         }, // Mieczyk
//         { text: "Jaki kwiat jest symbolem Maryii?", id: "22" }, // Lilia
//         { text: "Jak nazywa się przyprawa produkowana z krokusów?", id: "23" }, // Szafran
//         { text: 'Kto jest autorem powieści "Imię Róży"?', id: "24" }, // Umberto Eco
//         { text: "Z jakiego kwiatu robi się popularną zupę?", id: "25" }, // Kalafior/Brokuł
//       ],
//     },
//     {
//       groupName: "Zwierzontki",
//       icon: faHippo,
//       questionsGroupType: "picture",
//       questions: [
//         {
//           text: "Co to za zwierzę?",
//           id: "31",
//           imageUrl:
//             "https://tvn24.pl/tvnmeteo/najnowsze/cdn-zdjecie21b5abf6bca95661b22e226a0d7ac5db-szop-pracz-to-pozornie-niegrozne-zwierze-2158387/alternates/FOUR_THREE_1280",
//         }, // Szyszki
//         { text: "Jak nazywa się piwom, które pije Ferdek Kiepski?", id: "32" }, // Mocny Full
//         {
//           text: "Jak nazywa się seria komiksów napisana przez Papcia Chmiela?",
//           id: "33",
//         }, // Tytus, Romek i Atomek
//         { text: "Co oznacza wysokie IBU piwa?", id: "34" }, // Dużą zawartość chmielu
//         { text: "Jakie piwo nazwiemy Stoutem?", id: "35" }, // Ciemne, mocno prażony słód, dużo chmielu
//       ],
//     },
//     {
//       groupName: "Geografia",
//       questionsGroupType: "text",
//       questions: [
//         { text: "Jaka jest stolica Austrii?", id: "41" }, // Wiedeń
//         { text: "Nad jaką rzeką leży Paryż?", id: "42" }, // Sekwana
//         { text: "Jaka jest stolica Islandi?", id: "43" }, // Reykiavik
//         { text: "Jakie kolory ma flaga Rumunii?", id: "44" }, // Niebieski, Żółty, Czerwony
//         { text: "Jakie jest najludniejsze państwo w Afryce?", id: "45" }, // Nigeria
//       ],
//     },
//     {
//       groupName: "Radom",
//       questionsGroupType: "text",
//       questions: [
//         { text: "Ile wieży znajduje się na herbie Radomia?", id: "51" }, // 3
//         { text: "Po co chwytała Chytra Baba z Radomia?", id: "52" }, // Po Zbyszko 3 Cytryny
//         {
//           text: 'W który dzień czerwca dobywają się obchody ku pamięci "Czerwca 76" ?',
//           id: "53",
//         },
//         { text: 'Czego symbolem jest "Radomska Piotrówka"?', id: "54" }, // Zalozenia miasta
//         {
//           text: "Jak nazywało się 3 rónych ostatnich prezydentów Radomia (wraz z aktualnym)?",
//           id: "55",
//         }, // Witkowski, Kosztowniak, Marcinkowski
//       ],
//     },
//   ],
//   secondQuestionsGroup: [
//     {
//       groupName: "Matematyka",
//       questionsGroupType: "text",
//       questions: [
//         { text: "Ile to 6 * 8 ?", id: "61" }, // 48
//         { text: "Ile to 2 + 2 * 2 ?", id: "62" }, // 6
//         { text: "Ile to 15 ^ 2 ?", id: "63" }, // 225
//         { text: "Ile to 13 * 2 * 0 * 7 ?", id: "64" }, // 0
//         { text: "Ile to 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 ?", id: "65" }, // 55
//       ],
//     },
//     {
//       groupName: "Duży Ekran",
//       questionsGroupType: "text",
//       questions: [
//         {
//           text: "Jaki aktor przebiera się za mikołaja w serii Listy do M.?",
//           id: "71",
//         }, // Karolak
//         { text: "Ile części ma Shrek?", id: "72" }, // 4
//         {
//           text: "Jaka aktorka grała główną rolę w filmie KIll Bill?",
//           id: "73",
//         }, // Uma Thurman
//         { text: "Jaki aktor dostał Oscara w 2022?", id: "74" }, // Will Smith
//         { text: "Na jakim festiwalu przyznaje się Złote Palmy?", id: "75" }, // Międzynarodowy Festiwal Filmowy w Cannes
//       ],
//     },
//     {
//       groupName: "WYWARZA",
//       questionsGroupType: "text",
//       questions: [
//         { text: "DIANY", id: "81" }, // dynia
//         { text: "SKOCZNE", id: "82" }, // czosnek
//         { text: "KNIAZIEM", id: "83" }, // ziemniak
//         { text: "FOLIARKA", id: "84" }, // kalafior
//         { text: "KOCIARY", id: "85" }, // cykoria
//       ],
//     },
//     {
//       groupName: "Kolory",
//       questionsGroupType: "text",
//       questions: [
//         { text: "Jaki kolor to turkusowy?", id: "91" }, // blady niebiesko zielony
//         { text: "Jaki kolor to amarantowy?", id: "92" }, // kardynal, rozowo czerwony
//         { text: "Jaki kolor to ultramaryna?", id: "93" }, // ciemny niebieski
//         { text: "Jaki kolor to indygo?", id: "94" }, // fioletowy
//         { text: "Jaki kolor to malahitowy?", id: "95" }, // zywy ciemniejszy zielony
//       ],
//     },
//     {
//       groupName: "Karole",
//       questionsGroupType: "text",
//       questions: [
//         {
//           text: "Jak na nazwisko ma słynny polski szczypiornistwa, Karol?",
//           id: "101",
//         }, // Bielecki
//         { text: "Jak nazywa się francuska wersja imienia Karol?", id: "102" }, // Charles
//         {
//           text: "Któym Karolem jest akutalny król Wielkiej Brytanii?",
//           id: "103",
//         }, // III
//         { text: "W którym roku urodził się Karol Wojtyła?", id: "104" }, // 1920
//         { text: "Co oznacza imię Karol?", id: "105" }, // Wojownik, człowiek mezny
//       ],
//     },
//   ],
// };

// export const secondGameSetupBase: IGameSetupBase = {
//   finalQuestion: "Wymień 3 noblistów po 2000 roku.",
//   firstQuestionsGroup: [
//     {
//       groupName: "Kokosy",
//       icon: faMicrophone,
//       questionsGroupType: "sound",
//       questions: [
//         {
//           text: "Kto to spiewa?",
//           id: "11",
//           soundUrl: "https://www.computerhope.com/jargon/m/example.mp3",
//         }, // 15
//         {
//           text: "Co się dzieje gdy zawodnik dostanie czerwoną kartkę?",
//           id: "12",
//         }, // Przeciwnicy dostają punkt
//         { text: "Ile zmian może wykonać trener podczas seta?", id: "13" }, // 6
//         {
//           text: "Na jakiej wysokości znajduje się górna taśma w siatkówce kobiet?",
//           id: "14",
//         }, // 2.24
//         { text: "Do ilu punktów kiedyś grano seta?", id: "15" }, // 21
//       ],
//     },
//     {
//       groupName: "Ananasy",
//       icon: faSpa,
//       questionsGroupType: "text",
//       questions: [
//         {
//           text: "Jak nazywa się kwiat, którego nazwa jest jak nazwa broni?",
//           id: "21",
//         }, // Mieczyk
//         { text: "Jaki kwiat jest symbolem Maryii?", id: "22" }, // Lilia
//         { text: "Jak nazywa się przyprawa produkowana z krokusów?", id: "23" }, // Szafran
//         { text: 'Kto jest autorem powieści "Imię Róży"?', id: "24" }, // Umberto Eco
//         { text: "Z jakiego kwiatu robi się popularną zupę?", id: "25" }, // Kalafior/Brokuł
//       ],
//     },
//     {
//       groupName: "Kaszojady",
//       icon: faHippo,
//       questionsGroupType: "picture",
//       questions: [
//         {
//           text: "Co to za zwierzę?",
//           id: "31",
//           imageUrl:
//             "https://tvn24.pl/tvnmeteo/najnowsze/cdn-zdjecie21b5abf6bca95661b22e226a0d7ac5db-szop-pracz-to-pozornie-niegrozne-zwierze-2158387/alternates/FOUR_THREE_1280",
//         }, // Szyszki
//         { text: "Jak nazywa się piwom, które pije Ferdek Kiepski?", id: "32" }, // Mocny Full
//         {
//           text: "Jak nazywa się seria komiksów napisana przez Papcia Chmiela?",
//           id: "33",
//         }, // Tytus, Romek i Atomek
//         { text: "Co oznacza wysokie IBU piwa?", id: "34" }, // Dużą zawartość chmielu
//         { text: "Jakie piwo nazwiemy Stoutem?", id: "35" }, // Ciemne, mocno prażony słód, dużo chmielu
//       ],
//     },
//     {
//       groupName: "Pieski",
//       questionsGroupType: "text",
//       questions: [
//         { text: "Jaka jest stolica Austrii?", id: "41" }, // Wiedeń
//         { text: "Nad jaką rzeką leży Paryż?", id: "42" }, // Sekwana
//         { text: "Jaka jest stolica Islandi?", id: "43" }, // Reykiavik
//         { text: "Jakie kolory ma flaga Rumunii?", id: "44" }, // Niebieski, Żółty, Czerwony
//         { text: "Jakie jest najludniejsze państwo w Afryce?", id: "45" }, // Nigeria
//       ],
//     },
//     {
//       groupName: "Kotki",
//       questionsGroupType: "text",
//       questions: [
//         { text: "Ile wieży znajduje się na herbie Radomia?", id: "51" }, // 3
//         { text: "Po co chwytała Chytra Baba z Radomia?", id: "52" }, // Po Zbyszko 3 Cytryny
//         {
//           text: 'W który dzień czerwca dobywają się obchody ku pamięci "Czerwca 76" ?',
//           id: "53",
//         },
//         { text: 'Czego symbolem jest "Radomska Piotrówka"?', id: "54" }, // Zalozenia miasta
//         {
//           text: "Jak nazywało się 3 rónych ostatnich prezydentów Radomia (wraz z aktualnym)?",
//           id: "55",
//         }, // Witkowski, Kosztowniak, Marcinkowski
//       ],
//     },
//   ],
//   secondQuestionsGroup: [
//     {
//       groupName: "Matematyka",
//       questionsGroupType: "text",
//       questions: [
//         { text: "Ile to 6 * 8 ?", id: "61" }, // 48
//         { text: "Ile to 2 + 2 * 2 ?", id: "62" }, // 6
//         { text: "Ile to 15 ^ 2 ?", id: "63" }, // 225
//         { text: "Ile to 13 * 2 * 0 * 7 ?", id: "64" }, // 0
//         { text: "Ile to 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 ?", id: "65" }, // 55
//       ],
//     },
//     {
//       groupName: "Duży Ekran",
//       questionsGroupType: "text",
//       questions: [
//         {
//           text: "Jaki aktor przebiera się za mikołaja w serii Listy do M.?",
//           id: "71",
//         }, // Karolak
//         { text: "Ile części ma Shrek?", id: "72" }, // 4
//         {
//           text: "Jaka aktorka grała główną rolę w filmie KIll Bill?",
//           id: "73",
//         }, // Uma Thurman
//         { text: "Jaki aktor dostał Oscara w 2022?", id: "74" }, // Will Smith
//         { text: "Na jakim festiwalu przyznaje się Złote Palmy?", id: "75" }, // Międzynarodowy Festiwal Filmowy w Cannes
//       ],
//     },
//     {
//       groupName: "WYWARZA",
//       questionsGroupType: "text",
//       questions: [
//         { text: "DIANY", id: "81" }, // dynia
//         { text: "SKOCZNE", id: "82" }, // czosnek
//         { text: "KNIAZIEM", id: "83" }, // ziemniak
//         { text: "FOLIARKA", id: "84" }, // kalafior
//         { text: "KOCIARY", id: "85" }, // cykoria
//       ],
//     },
//     {
//       groupName: "Kolory",
//       questionsGroupType: "text",
//       questions: [
//         { text: "Jaki kolor to turkusowy?", id: "91" }, // blady niebiesko zielony
//         { text: "Jaki kolor to amarantowy?", id: "92" }, // kardynal, rozowo czerwony
//         { text: "Jaki kolor to ultramaryna?", id: "93" }, // ciemny niebieski
//         { text: "Jaki kolor to indygo?", id: "94" }, // fioletowy
//         { text: "Jaki kolor to malahitowy?", id: "95" }, // zywy ciemniejszy zielony
//       ],
//     },
//     {
//       groupName: "Karole",
//       questionsGroupType: "text",
//       questions: [
//         {
//           text: "Jak na nazwisko ma słynny polski szczypiornistwa, Karol?",
//           id: "101",
//         }, // Bielecki
//         { text: "Jak nazywa się francuska wersja imienia Karol?", id: "102" }, // Charles
//         {
//           text: "Któym Karolem jest akutalny król Wielkiej Brytanii?",
//           id: "103",
//         }, // III
//         { text: "W którym roku urodził się Karol Wojtyła?", id: "104" }, // 1920
//         { text: "Co oznacza imię Karol?", id: "105" }, // Wojownik, człowiek mezny
//       ],
//     },
//   ],
// };

export const firstGameSetupBase: IGameSetupBase = {
  finalQuestion: "Wymień 3 noblistów po 2000 roku.",
  firstQuestionsGroup: [
    {
      groupName: "Sławne Głosy",
      icon: faMicrophone,
      questionsGroupType: "sound",
      questions: [
        {
          text: "Kto to spiewa?",
          id: "11",
          soundUrl: "https://www.computerhope.com/jargon/m/example.mp3",
        }, // 15
        {
          text: "Co się dzieje gdy zawodnik dostanie czerwoną kartkę?",
          id: "12",
        }, // Przeciwnicy dostają punkt
      ],
    },
    {
      groupName: "Kwiatki",
      icon: faSpa,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jak nazywa się kwiat, którego nazwa jest jak nazwa broni?",
          id: "21",
        }, // Mieczyk
        { text: "Jaki kwiat jest symbolem Maryii?", id: "22" }, // Lilia
      ],
    },
  ],
  secondQuestionsGroup: [
    {
      groupName: "Matematyka",
      questionsGroupType: "text",
      questions: [
        { text: "Ile to 6 * 8 ?", id: "61" }, // 48
        { text: "Ile to 2 + 2 * 2 ?", id: "62" }, // 6
      ],
    },
    {
      groupName: "Duży Ekran",
      questionsGroupType: "text",
      questions: [
        {
          text: "Jaki aktor przebiera się za mikołaja w serii Listy do M.?",
          id: "71",
        }, // Karolak
        { text: "Ile części ma Shrek?", id: "72" }, // 4
      ],
    },
  ],
};

export const secondGameSetupBase: IGameSetupBase = {
  finalQuestion: "Wymień 3 noblistów po 2000 roku.",
  firstQuestionsGroup: [
    {
      groupName: "Sławne Kurki",
      icon: faMicrophone,
      questionsGroupType: "sound",
      questions: [
        {
          text: "Kto to spiewa?",
          id: "11",
          soundUrl: "https://www.computerhope.com/jargon/m/example.mp3",
        }, // 15
        {
          text: "Co się dzieje gdy zawodnik dostanie czerwoną kartkę?",
          id: "12",
        }, // Przeciwnicy dostają punkt
      ],
    },
    {
      groupName: "Ziomale",
      icon: faSpa,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jak nazywa się kwiat, którego nazwa jest jak nazwa broni?",
          id: "21",
        }, // Mieczyk
        { text: "Jaki kwiat jest symbolem Maryii?", id: "22" }, // Lilia
      ],
    },
  ],
  secondQuestionsGroup: [
    {
      groupName: "Fizyka",
      questionsGroupType: "text",
      questions: [
        { text: "Ile to 6 * 8 ?", id: "61" }, // 48
        { text: "Ile to 2 + 2 * 2 ?", id: "62" }, // 6
      ],
    },
    {
      groupName: "Duży Papieros",
      questionsGroupType: "text",
      questions: [
        {
          text: "Jaki aktor przebiera się za mikołaja w serii Listy do M.?",
          id: "71",
        }, // Karolak
        { text: "Ile części ma Shrek?", id: "72" }, // 4
      ],
    },
  ],
};

export const finalGameSetupBase: IGameSetupBase = {
  finalQuestion: "Wymień 3 noblistów po 2000 roku.",
  firstQuestionsGroup: [
    {
      groupName: "F1",
      icon: faMicrophone,
      questionsGroupType: "sound",
      questions: [
        {
          text: "Kto to spiewa?",
          id: "11",
          soundUrl: "https://www.computerhope.com/jargon/m/example.mp3",
        }, // 15
        {
          text: "Co się dzieje gdy zawodnik dostanie czerwoną kartkę?",
          id: "12",
        }, // Przeciwnicy dostają punkt
      ],
    },
    {
      groupName: "F2",
      icon: faSpa,
      questionsGroupType: "text",
      questions: [
        {
          text: "Jak nazywa się kwiat, którego nazwa jest jak nazwa broni?",
          id: "21",
        }, // Mieczyk
        { text: "Jaki kwiat jest symbolem Maryii?", id: "22" }, // Lilia
      ],
    },
  ],
  secondQuestionsGroup: [
    {
      groupName: "F3",
      questionsGroupType: "text",
      questions: [
        { text: "Ile to 6 * 8 ?", id: "61" }, // 48
        { text: "Ile to 2 + 2 * 2 ?", id: "62" }, // 6
      ],
    },
    {
      groupName: "F4",
      questionsGroupType: "text",
      questions: [
        {
          text: "Jaki aktor przebiera się za mikołaja w serii Listy do M.?",
          id: "71",
        }, // Karolak
        { text: "Ile części ma Shrek?", id: "72" }, // 4
      ],
    },
  ],
};

export const firstGameSetup = getFullGameSetup(firstGameSetupBase);
export const secondGameSetup = getFullGameSetup(secondGameSetupBase);
export const finalGameSetup = getFullGameSetup(finalGameSetupBase);

export const tournamentSetup: ITournamentSetup = {
  gamesSetups: [firstGameSetup, secondGameSetup],
  finalGameSetup: finalGameSetup,
};
