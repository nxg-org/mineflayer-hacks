import { BotEvents } from "mineflayer";
import { RandomHacks } from "../hackClass";

export interface ListenerOpts {

}


export interface HackOpts <T extends keyof BotEvents>{
    name: string
    once: boolean,
    listenOn: string,
    listener: (...args: Parameters<BotEvents[T]>) => Promise<any> | Promise<unknown> | Promise<void> | void;
    aliases?: string[]
}
