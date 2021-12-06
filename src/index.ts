import { Bot } from "mineflayer";
import { RandomHacks } from "./randomhacks"
import utilPlugin from "@nxg-org/mineflayer-util-plugin"


declare module "mineflayer" {
    interface Bot {
        randomHacks: RandomHacks
        enableBlink: () => void
        disableBlink: () => void
    }
}

declare module "prismarine-entity" {
    interface Entity {
        //ffs mineflayer devs, get it together.
        isInWater: boolean
        isInLava: boolean
        isCollidedHorizontally: boolean
        isCollidedVertically: boolean
    }
}


export default function plugin(bot: Bot) {
    bot.randomHacks = new RandomHacks(bot)
}