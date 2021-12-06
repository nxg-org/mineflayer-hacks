import { Block } from "prismarine-block";
import { RandomHacks } from "../randomhacks";
import { HackOpts } from "../types/hackFormat";
import { StaticHackOpts } from "../types/staticHackFormat";

export default class stepHack implements HackOpts<"move"> {
    public name = "step";
    public once = false;
    public listenOn = "move";
    public listener;
    public startY: number = 0
    public shouldStart = true
    constructor(public hacks: RandomHacks) {
        this.listener = async () => {
            // // e @ts-expect-error
            // console.log(hacks.bot.entity.position.toString(), hacks.bot.physics.stepHeight, hacks.bot.getControlState("jump"), hacks.bot.entity.isCollidedHorizontally, hacks.bot.entity.onGround)
            // if (!hacks.step.enabled) return;
            // hacks.bot.pathfinder
            ////@ts-expect-error
            if (hacks.bot.entity.isCollidedHorizontally && this.shouldStart) {
                switch (hacks.step.mode) {
                    case "ncp": 
                        //@ts-expect-error
                        hacks.bot.physics.stepHeight = 0.6;
                        
                        //right now assuming step of 1.
                        let height = 1
                        let {x, y, z} = hacks.bot.entity.position
                        let first = 0.42;
                        let second = 0.75;
                        if (height != 1.0) {
                            first *= height;
                            second *= height;
                            if (first > 0.425) {
                                first = 0.425;
                            }
                            if (second > 0.78) {
                                second = 0.78;
                            }
                            if (second < 0.49) {
                                second = 0.49;
                            }
                        }

                        // hacks.bot.entity.position.set(x, y, z)
                        // hacks.bot.entity.onGround = false
                        // // hacks.bot._client.write("position", {x: x, y: y, z: z, onGround: false });
                        // y = y + first
                        // hacks.bot.entity.position.set(x, y, z)
                        // hacks.bot.entity.onGround = false
                        // // hacks.bot._client.write("position", {x: x, y: y, z: z, onGround: false });
                        // y = y + second
                        // // for (const off of [0.42, 0.33, 0.24, 0.083, -0.078]) {
                        //     y = y + off
                        //     if (y > this.startY + 1.1) {
                        //         this.shouldStart = false
                        //     };
                        //     hacks.bot.entity.position = hacks.bot.entity.position.set(x, y, z)
                            // hacks.bot.entity.onGround = false
                            // hacks.bot._client.write("position", {x: x, y: y, z: z, onGround: false});
                        // }
                        break;
                    case "vanilla":
                        break;
                }
            } else {
                this.startY = hacks.bot.entity.position.y
                this.shouldStart = true
                // @ts-expect-error
                hacks.bot.physics.stepHeight = hacks.step.stepHeight
            }


            // 
            // 
        };
    }
}
