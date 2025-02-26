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
    id: 71,
    name: "Batman II",
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
      fullName: "Dick Grayson",
      placeOfBirth: "-",
      firstAppearance: "-",
      publisher: "Nightwing",
      alignment: "good"
    },
    images: {
      xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/71-batman-ii.jpg",
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/71-batman-ii.jpg",
      md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/71-batman-ii.jpg",
      lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/71-batman-ii.jpg"
    }
  }
]
