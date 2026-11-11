import { useEffect } from "react";

import { IGameSetup } from "./geopardyTypes";

// Trzymamy referencje do obiektów Image na poziomie modułu - dzięki temu
// przeglądarka nie wyrzuca pobranych (i zdekodowanych) obrazków z pamięci.
const preloaded = new Map<string, HTMLImageElement>();

const preloadImage = (url: string) => {
  if (preloaded.has(url)) {
    return;
  }
  const image = new Image();
  image.decoding = "async";
  image.src = url;
  preloaded.set(url, image);
  // decode() pobiera i dekoduje obrazek z wyprzedzeniem, więc przy wejściu
  // w pytanie nie ma już ani pobierania, ani dekodowania.
  image.decode().catch(() => {
    // Nie udało się (np. martwy link) - pozwól spróbować ponownie później.
    preloaded.delete(url);
  });
};

/** Ładuje w tle wszystkie obrazki pytań z danej gry (obie rundy). */
export const useImagePreload = (game: IGameSetup) => {
  useEffect(() => {
    [...game.firstQuestionsGroup, ...game.secondQuestionsGroup]
      .flatMap((questionsGroup) => questionsGroup.questions)
      .forEach((question) => {
        if (question.imageUrl) {
          preloadImage(question.imageUrl);
        }
      });
  }, [game]);
};
