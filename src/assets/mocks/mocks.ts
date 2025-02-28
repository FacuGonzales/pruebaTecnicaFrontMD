import { AlertMessage } from "../../app/models/alert-message";
import { Images } from "../../app/models/images-model";
import { SuperHero } from "../../app/models/super-hero-model";

export const MOCK_HEROES_LIST: SuperHero[] = [
  {
    id: 1,
    name: "A-bomb",
    appearance: {
      gender: "Male",
      height: "6'8",
      weight: "980 lb",
      race: "Human"
    },
    biography: {
      alignment: "Good",
      firstAppearance: "Hulk vol 2 #2 (april, 2008) (as a-bomb)",
      fullName: "Richard milhouse jones",
      placeOfBirth: "Scarsdale, arizona",
      publisher: "Marvel Comics"
    },
    images: {
      lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg",
      md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
      xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg"
    },
    powerstats: {
      combat: 64,
      durability: 80,
      intelligence: 38,
      power: 24,
      speed: 17,
      strength: 100
    }
  },
  {
    id: 2,
    name: "Abe Sapien",
    appearance: {
      gender: "Male",
      height: "6'3",
      weight: "145 lb",
      race: "Icthyo Sapien"
    },
    biography: {
      alignment: "good",
      firstAppearance: "Hellboy: Seed of Destruction (1993)",
      fullName: "Abraham Sapien",
      placeOfBirth: "-",
      publisher: "Abraham Sapien"
    },
    images: {
      lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/2-abe-sapien.jpg",
      md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/2-abe-sapien.jpg",
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/2-abe-sapien.jpg",
      xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/2-abe-sapien.jpg"
    },
    powerstats: {
      combat: 85,
      durability: 65,
      intelligence: 88,
      power: 100,
      speed: 35,
      strength: 28
    }
  }
];


export const MOCK_FORM_DATA = {
  name: 'A-Bomb',
  gender: 'Male',
  height: "6'8",
  weight: '980 lb',
  race: 'Human',
  alignment: 'good',
  firstAppearance: 'Hulk Vol 2 #2 (April, 2008) (as A-Bomb)',
  fullName: 'Richard Milhouse Jones',
  placeOfBirth: 'Scarsdale, Arizona',
  publisher: 'Marvel Comics',
  combat: 64,
  durability: 80,
  intelligence: 38,
  power: 24,
  speed: 17,
  strength: 100
}

export const MOCK_NO_EXISTE_HERO = {
  id: 2,
  name: "POPEYE",
  powerstats: {
    intelligence: 88,
    strength: 11,
    speed: 33,
    durability: 28,
    power: 36,
    combat: 100
  },
  appearance: {
    gender: "Male",
    race: "Human",
    height: "5'10",
    weight: "175 lb",
  },
  biography: {
    fullName: "Chespirito",
    placeOfBirth: "-",
    firstAppearance: "-",
    publisher: "Nightwing",
    alignment: "good"
  },
  images: {
    xs: "",
    sm: "",
    md: "",
    lg: ""
  }
}

export const MOCK_CREATE_HERO = {
  id: 3,
  name: "Chapulin",
  powerstats: {
    intelligence: 88,
    strength: 11,
    speed: 33,
    durability: 28,
    power: 36,
    combat: 100
  },
  appearance: {
    gender: "Male",
    race: "Human",
    height: "5'10",
    weight: "175 lb",
  },
  biography: {
    fullName: "Chespirito",
    placeOfBirth: "-",
    firstAppearance: "-",
    publisher: "Nightwing",
    alignment: "good"
  },
  images: {
    xs: "",
    sm: "",
    md: "",
    lg: ""
  }
}

export const MOCK_UPDATE_HERO = {
  id: 70,
  name: "BATMAAAAN",
  powerstats: {
    intelligence: 88,
    strength: 11,
    speed: 33,
    durability: 28,
    power: 36,
    combat: 100
  },
  appearance: {
    gender: "Male",
    race: "Human",
    height: "5'10",
    weight: "175 lb",
  },
  biography: {
    fullName: "Chespirito",
    placeOfBirth: "-",
    firstAppearance: "-",
    publisher: "Nightwing",
    alignment: "good"
  },
  images: {
    xs: "",
    sm: "",
    md: "",
    lg: ""
  }
}

export const MOCK_IMAGES: Images = {
  xs: 'xs.jpg',
  sm: 'sm.jpg',
  md: 'md.jpg',
  lg: 'lg.jpg',
};

export const MOCK_MESSAGE_CREATE: AlertMessage = {
  title: 'ALERTS.MESSAGES.OK.TITLE',
  text: 'ALERTS.MESSAGES.OK.TEXT_CREATE'
};

export const MOCK_MESSAGE_UPDATE: AlertMessage = {
  title: 'ALERTS.MESSAGES.OK.TITLE',
  text: 'ALERTS.MESSAGES.OK.TEXT_UPDATE'
}
