import { HackOpts } from "../types/hackFormat";
import { RandomHacks } from "../randomhacks";
import { goals } from "mineflayer-pathfinder";
const { Goal } = goals;
import { Vec3 } from "vec3";
import MinecraftData from "minecraft-data";

//goal should be typed but isn't due to plugin.

export default class reactiveJesus implements HackOpts<"physicsTick"> {
    public name = "jesus";
    public once = false;
    public listenOn = "physicsTick";
    public listener;
    public blockDataByName;
    constructor(public hacks: RandomHacks) {
        this.blockDataByName = MinecraftData(hacks.bot.version).blocksByName;
        this.listener = () => {
            if (hacks.jesus.enabled) {
                switch (hacks.jesus.mode) {
                    case "trampoline":
                        this.trampolineJesus(hacks);
                        break;
                    case "solid":
                        this.solidJesus(hacks);
                        break;
                }
            }
        };
    }

    isFluid(pos: Vec3) {
        return this.hacks.bot.blockAt(pos)?.name.includes("water");
    }

    //bleachHack.
    solidJesus(hacks: RandomHacks) {
        const vel = hacks.bot.entity.velocity.clone();
        const {x, y, z} = vel;
        if (this.isFluid(hacks.bot.entity.position.offset(0, 0.3, 0))) {
            hacks.bot.entity.velocity = new Vec3(x, 0.08, z);
        } else if (this.isFluid(hacks.bot.entity.position.offset(0, 0.07, 0))) {
            
            hacks.bot.entity.position.y = Math.floor(hacks.bot.entity.position.y) + 0.99
            hacks.bot.entity.velocity = new Vec3(x, 0.01, z);
            hacks.bot.entity.onGround = true;
            // hacks.bot.entity.velocity = new Vec3(x, 0.01, z);
        } else if (this.isFluid(hacks.bot.entity.position)) {
            hacks.bot.entity.position.y = Math.floor(hacks.bot.entity.position.y) + 0.99
            hacks.bot.entity.velocity = new Vec3(x, 0.01, z);
            // hacks.bot.entity.velocity = new Vec3(x, -0.005, z);
            hacks.bot.entity.onGround = true;
        }
    }

    trampolineJesus(hacks: RandomHacks) {
        const goal = hacks.bot.pathfinder.goal ?? null;
        if (!!goal) hacks.lastGoal = goal;
        const targetPos = !!hacks.lastGoal?.entity ? hacks.lastGoal.entity.position : undefined;
        if (hacks.bot.entity.isInWater || hacks.bot.entity.isInLava) {
            const { x, y, z } = hacks.bot.entity.position;
            hacks.bot.entity.isInWater = false;
            hacks.bot.entity.isInLava = false;
            hacks.bot.entity.onGround = true;
            hacks.bot.setControlState("jump", true);

            hacks.bot.entity.position = hacks.bot.entity.position.set(x, y + 2, z);
        } else if (
            [-1, -2, -3].some(
                (number) => hacks.bot.blockAt(hacks.bot.entity.position.offset(0, number, 0))?.type === this.blockDataByName.water.id
            )
        ) {
            if (goal) hacks.bot.pathfinder.setGoal(null);
            if (targetPos) hacks.bot.lookAt(targetPos);
            hacks.bot.setControlState("forward", true);

            const vel = hacks.bot.entity.velocity;
            const newVel = vel.clone().normalize();
            let { x, y, z } = vel;
            //this math is scuffed and should be changed.
            x = x * Math.sqrt(Math.pow(0.8, 2) / (Math.pow(newVel.x, 2) + Math.pow(newVel.z, 2)));
            z = z * Math.sqrt(Math.pow(0.8, 2) / (Math.pow(newVel.x, 2) + Math.pow(newVel.z, 2)));
            hacks.bot.entity.velocity = hacks.bot.entity.velocity.set(!!x ? x : 0, y > -0.2 ? y : -0.2, !!z ? z : 0);
        } else {
            if (!hacks.bot.pathfinder.goal) hacks.bot.pathfinder.setGoal(hacks.lastGoal);
        }
    }
}
