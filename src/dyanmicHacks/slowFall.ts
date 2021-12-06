import { HackOpts } from "../types/hackFormat";
import { RandomHacks } from "../randomhacks";
import { Vec3 } from "vec3";

export default class slowFall implements HackOpts<"move"> {
    public name = "slowfall";
    public once = false;
    public listenOn = "move";
    public listener;
    constructor(public hacks: RandomHacks) {
        this.listener = () => {
            const { x, y, z } = hacks.bot.entity.velocity;
            const speed = hacks.slowfall.maxFallSpeed;
            if (y < speed) {
                hacks.bot.entity.velocity = new Vec3(x, speed, z);
            }
        };
    }
}
