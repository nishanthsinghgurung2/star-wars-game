import { STARSHIPS_CARD_IMGS, PEOPLE_CARD_IMGS } from './graphics';

export interface CardSuitMeta {
  label: string;
  path: string;
  img: string;
}

export const BASE_SUIT_PATH = '/boards';

export const CARD_SUIT_META = {
  starships: {
    label: 'Starships',
    path: BASE_SUIT_PATH + '/starships',
    img:
      'https://scandinaviantraveler.com/sites/default/files/styles/article_top_full_imagecustom_user_desktop_large_1x/public/starwars-fleet-1140x619.jpg?itok=jDZnk9oX',
    cardImgs: STARSHIPS_CARD_IMGS,
  },
  people: {
    label: 'People',
    path: BASE_SUIT_PATH + '/people',
    img: 'https://pvpantherprint.org/wp-content/uploads/2018/03/star-wars-prequels.jpg',
    cardImgs: PEOPLE_CARD_IMGS,
  },
};
