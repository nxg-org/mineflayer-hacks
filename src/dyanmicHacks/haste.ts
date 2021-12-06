import { Entity } from "prismarine-entity";
import { RandomHacks } from "../hackClass";
import { HackOpts } from "../hackTypes/hackFormat";
import { uuid } from "../hackUtil";

export default class hasteHack implements HackOpts<"physicsTick"> {
    public name = "haste";
    public once = false;
    public listenOn = "physicsTick";
    public listener;
    constructor(public hacks: RandomHacks) {
        this.listener = () => {
            const entity = hacks.bot.entity;
            const effect = {
                id: 3,
                amplifier: 2,
                duration: 32767,
            };
            hacks.bot.emit("entityEffect", entity, effect);

            let key: string = "";
            let val: any;
            if (!entity.attributes) entity.attributes = {};
            for (const testKey in entity.attributes) {
                if (testKey.includes("attackSpeed")) {
                    key = testKey;
                    val = entity.attributes[key];
                }
            }
            const uuidStr: string = uuid();
            entity.attributes[key] = {
                ...val,
                modifiers:
                    !!val && val["modifiers"]["amount"] === 0.3
                        ? val["modifiers"]
                        : {
                              uuid: uuidStr,
                              amount: 0.3,
                              operation: 2,
                          },
            };

            hacks.bot.emit("entityAttributes", entity);
        };
    }
}
