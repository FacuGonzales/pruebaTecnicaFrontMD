import { AlertMessage } from "../../app/models/alert-message";
import { Images } from "../../app/models/images-model";
import { SuperHero } from "../../app/models/super-hero-model";

export const MOCK_SUPER_HEROES: SuperHero[] = [
  {
    id: 70,
    name: "Batman",
    powerstats: {
    intelligence: 100,
    strength: 26,
    speed: 27,
    durability: 50,
    power: 47,
    combat: 100
    },
    appearance: {
      gender: "Male",
      race: "Human",
      height: "6'2",
      weight: "210 lb",
    },
    biography: {
      fullName: "Bruce Wayne",
      placeOfBirth: "Crest Hill, Bristol Township; Gotham County",
      firstAppearance: "Detective Comics #27",
      publisher: "DC Comics",
      alignment: "good"
    },
    images: {
      xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/70-batman.jpg",
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/70-batman.jpg",
      md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/70-batman.jpg",
      lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg"
    }
  },
  {
    id: 200,
    name: "Daphne Powell",
    powerstats: {
    intelligence: 100,
    strength: 100,
    speed: 100,
    durability: 100,
    power: 100,
    combat: 84
    },
    appearance: {
      gender: "Male",
      race: "God / Eternal",
      height: "-",
      weight: "- lb",
    },
    biography: {
      fullName: "",
      placeOfBirth: "Created in the Beyond",
      firstAppearance: "Marvel Super-Heroes Secret Wars #1",
      publisher: "Marvel Comics",
      alignment: "good"
    },
    images: {
      xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/200-daphne-powell.jpg",
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/200-daphne-powell.jpg",
      md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/200-daphne-powell.jpg",
      lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/200-daphne-powell.jpg"
    }
  }
]

export const MOCK_CREATE_HERO = {
  id: 1,
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

export const MOCK_FORM = {
  name: 'spiderMan',
  gender: 'male',
  height: '178',
  weight: '75',
  race: 'human',
  alignment: 'good',
  firstAppearance: '1962',
  fullName: 'peter parker',
  placeOfBirth: 'new york',
  publisher: 'marvel',
  combat: 80,
  durability: 70,
  intelligence: 90,
  power: 85,
  speed: 75,
  strength: 80,
}

export const MOCK_IMAGES: Images = {
  xs: 'xs.jpg',
  sm: 'sm.jpg',
  md: 'md.jpg',
  lg: 'lg.jpg',
};

export const MOCK_HERO: SuperHero = {
  id: 201,
  name: 'Spiderman',
  appearance: {
    gender: 'Male',
    height: '178',
    weight: '75',
    race: 'human',
  },
  biography: {
    alignment: 'Good',
    firstAppearance: '1962',
    fullName: 'Peter parker',
    placeOfBirth: 'New york',
    publisher: 'marvel',
  },
  powerstats: {
    combat: 80,
    durability: 70,
    intelligence: 90,
    power: 85,
    speed: 75,
    strength: 80,
  },
  images: {
    xs: 'xs.jpg',
    sm: 'sm.jpg',
    md: 'md.jpg',
    lg: 'lg.jpg',
  },
}

export const MOCK_MESSAGE_CREATE: AlertMessage = {
  title: 'ALERTS.MESSAGES.OK.TITLE',
  text: 'ALERTS.MESSAGES.OK.TEXT_CREATE'
};

export const MOCK_MESSAGE_UPDATE: AlertMessage = {
  title: 'ALERTS.MESSAGES.OK.TITLE',
  text: 'ALERTS.MESSAGES.OK.TEXT_UPDATE'
}
