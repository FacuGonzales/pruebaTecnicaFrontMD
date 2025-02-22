import { Appearance } from "./appearance-model"
import { Biography } from "./biography-model"
import { Connections } from "./connections-model"
import { Images } from "./images-model"
import { Powerstats } from "./powerstats-model"

export interface SuperHero {
  id: number,
  name: string,
  appearance: Appearance,
  images: Images,
  biography: Biography,
  connections: Connections,
  powerstats: Powerstats
}
