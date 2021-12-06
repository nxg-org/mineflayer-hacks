import { HackOpts } from "../hackTypes/hackFormat";
import { RandomHacks } from "../hackClass";

export default class highJump implements HackOpts<"move"> {
    public name = "highjump";
    public once = false;
    public listenOn = "move";
    public listener
    constructor(public hacks: RandomHacks) {
        this.listener = async () => {
            if (hacks.highjump.enabled) {
                const offsetNewPos = (num: number) =>
                    hacks.bot.entity.position.set(hacks.bot.entity.position.x, hacks.bot.entity.position.y + num, hacks.bot.entity.position.z);
                if (hacks.bot.getControlState("jump") && hacks.bot.entity.onGround) {
                    const { x, y, z } = hacks.bot.entity.position;
                    offsetNewPos(0.2);
                    await hacks.bot.waitForTicks(1);
                    offsetNewPos(0.3);
                    await hacks.bot.waitForTicks(1);
                    offsetNewPos(0.4);
                    await hacks.bot.waitForTicks(1);
                    offsetNewPos(0.3);
                    await hacks.bot.waitForTicks(1);
                    offsetNewPos(0.2);
                    // await hacks.bot.waitForTicks(1)
                    // offsetNewPos(-0.1)
                    // await hacks.bot.waitForTicks(1)
                    // offsetNewPos(-0.4)
                    // await hacks.bot.waitForTicks(1)
                    // offsetNewPos(-0.6)
                    // await hacks.bot.waitForTicks(1)
                    // offsetNewPos(-0.8)
                    // await hacks.bot.waitForTicks(1)
                    // offsetNewPos(-0.9)
                    // await hacks.bot.waitForTicks(1)
    
                    // console.log("called, vel is:", hacks.bot.entity.position)
                }
            }
        }
    };
    
};
