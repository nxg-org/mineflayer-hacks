import { goals } from "mineflayer-pathfinder";
import { RandomHacks } from "../randomhacks";
import { StaticHackOpts } from "../types/staticHackFormat";
import { promisify } from "util";
import { Vec3 } from "vec3";

const sleep = promisify(setTimeout);

/**
 * Mineflayer-pathfinder still has no good goal typings. Lol.
 * This relies on a custom physics.js file. I will inject this later.
 * Any contributions will help.
 */
export default class blinkHack implements StaticHackOpts {
    public name = "blink";
    public execute;
    constructor(public hacks: RandomHacks) {
        this.execute = async (goalVec: Vec3) => {
            const goal = new goals.GoalBlock(goalVec.x, goalVec.y, goalVec.z);
            if (goal && hacks.bot.pathfinder.goal !== goal) {
                const timeout = hacks.blink.timeout;
                let moving = true;


                // const listener = new Promise((resolve, reject) => {
                //     const listener = (reachedGoal: any) => {
                //         hacks.bot.disableBlink();
                //         //@ts-expect-error
                //         hacks.bot.off("goal_reached", listener);
                //         resolve(reachedGoal);
                //     };

                //     setTimeout(() => {
                //         moving = false;
                //         //@ts-expect-error
                //         hacks.bot.off("goal_reached", listener);
                //         hacks.bot.disableBlink();
                //         reject(new Error(`Couldn't reach goal.`));
                //     }, timeout); // reject after 200ms

                //     //@ts-expect-error
                //     hacks.bot.once("goal_reached", listener);
                // });

                // const time1 = performance.now();

                // (async () => {
                //     while (performance.now() - time1 < 10000) {
                //         const dist = hacks.bot.entity.position.distanceTo(new Vec3(x, y, z));
                //         console.log(hacks.bot.entity.position);
                //         console.log(dist);

                //         await sleep(50);
                //     }
                // })();

                // console.log("goal!", goal);
                // hacks.bot.pathfinder.setGoal(goal, false);
                // hacks.bot.enableBlink();
                // const time = performance.now();
                // //@ts-expect-error
                // hacks.bot.once("goal_reached", console.log);

                // const res = await listener;

                // return res;

                //this works



                await hacks.bot.enableBlink()
                const time = performance.now()
                let lastPos = 0
                let buffer = 0
                await hacks.bot.pathfinder.setGoal(goal)
                while (performance.now() - time < 10000) {
                    const dist = hacks.bot.entity.position.distanceTo(goalVec)
                    if (buffer > 5) break
                    if (lastPos === dist)  buffer++
                    else buffer = 0
                    lastPos = dist

                    await sleep(50)
                }
                hacks.bot.disableBlink()

            }

            //Easy way out, not bothering.
            // const pathfinderListener = (goal: any) => {
            //     hacks.bot.disableBlink();
            // };

            // //@ts-expect-error
            // hacks.bot.once("goal_reached", pathfinderListener);

            // let lastPos = 0;
            // let buffer = 0;
            // const time = performance.now();
            // while (performance.now() - time < timeout) {
            //     const dist = hacks.bot.entity.position.distanceTo(goal);
            //     if (buffer > 2) break;
            //     if (lastPos === dist) buffer++;
            //     else buffer = 0;
            //     lastPos = dist;
            //     await sleep(50);
            // }
        };
    }
}
