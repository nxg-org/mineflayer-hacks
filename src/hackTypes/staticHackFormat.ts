import { BotEvents } from "mineflayer";
import { RandomHacks } from "../hackClass";


export interface StaticHackOpts {
    name: string
    aliases?: string[]
    execute: (...args: any) => Promise<any> | Promise<unknown> | Promise<void> | void;
}