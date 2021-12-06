import { Entity } from "prismarine-entity";
import { RandomHacks } from "../hackClass";
import { HackOpts } from "../hackTypes/hackFormat";

export default class reactiveAntiKnockback implements HackOpts<"move"> {
    public name = "kbcancel";
    public once = false;
    public listenOn = "move";
    public listener;
    constructor(public hacks: RandomHacks) {
        this.listener = () => {
            if (hacks.kbcancel.enabled) {
                if (hacks.kbcancel.updateMineflayer) {
                    hacks.bot.entity.velocity = hacks.bot.entity.velocity.set(0, 0, 0);
                } else {
                    //will fix.
                    hacks.bot._client.write("position", { ...hacks.bot.entity.position, onGround: hacks.bot.entity.onGround });
                }
            }
        };
    }
}
