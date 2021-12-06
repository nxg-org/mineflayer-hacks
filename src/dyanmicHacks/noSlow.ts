import { RandomHacks } from "../randomhacks";
import { HackOpts } from "../types/hackFormat";


export default class noSlow implements HackOpts<"move"> {
    public name = "noslow"
    public once = false
    public listenOn = "move"
    public listener;
    constructor(public hacks: RandomHacks) {
        this.listener = () => {
            // if (!hacks.antiwater.enabled) return;
            // if (!hacks.bot.entity.isInWater) return;
            // hacks.bot.entity.isInWater = false;
            const controlStates = [
                hacks.bot.controlState.forward,
                hacks.bot.controlState.right,
                hacks.bot.controlState.back,
                hacks.bot.controlState.left,
            ];

            if (this.detectIfOffhandActive() && controlStates.some(state => state === true)) {
                const yaw = hacks.bot.entity.yaw
                const newX = Math.sin(yaw + Math.PI / 2);
                const newZ = Math.cos(yaw + Math.PI / 2);
                hacks.bot.entity.velocity.set(0.12 * newX, hacks.bot.entity.velocity.y, 0.12 * newZ);
            }
            
        }
    }

    detectIfOffhandActive() {
        return (this.hacks.bot.entity.metadata[6] as any & (1 | 2) === (1 | 2))
    }
    
}
