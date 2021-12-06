import { HackOpts } from "../types/hackFormat";
import { RandomHacks } from "../randomhacks";

export default class noFall implements HackOpts<"move">  {
    public name = "nofall"
    public once = false
    public listenOn = "move"
    public listener;
    constructor(public hacks: RandomHacks) {
        this.listener = () => {
            if (hacks.nofall.enabled && hacks.bot.entity.position.y <= (hacks.slowfall ? -0.2 : -0.5)) {
                if (hacks.nofall.updateMineflayer) {
                    hacks.bot.entity.onGround = true;
                } else {
                    hacks.bot._client.write("position", { ...hacks.bot.entity.position, onGround: true });
                }
            }
        }
    }
};
