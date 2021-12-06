import { Bot } from "mineflayer";
import { RandomHacks } from "./hackClass"
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
    if (!bot.hasPlugin(utilPlugin)) bot.loadPlugin(utilPlugin)
    bot.randomHacks = new RandomHacks(bot)
}