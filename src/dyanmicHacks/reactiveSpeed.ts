import { HackOpts } from "../hackTypes/hackFormat";
import { RandomHacks } from "../hackClass";
import { Vec3 } from "vec3";

export default class reactiveSpeed implements HackOpts<"move"> {
    public name = "speed"
    public once = false
    public listenOn ="move"
    public listener;
    constructor (public hacks: RandomHacks) {
        this.listener = () => {

            const groundSpeedMultiplier = hacks.speed.groundSpeedMultiplier;
            const airSpeedMultiplier = hacks.speed.airSpeedMultiplier;
    
            const controlStates = [
                hacks.bot.controlState.forward,
                hacks.bot.controlState.right,
                hacks.bot.controlState.back,
                hacks.bot.controlState.left,
            ];
            
    
            switch (hacks.speed.mode) {
                case "strafe": 
                    if (!controlStates.some((state) => state === true)) return;
                    let yaw = hacks.bot.entity.yaw;
                    const vel = hacks.bot.entity.velocity;
    
                    // if (hacks.bot.entity.onGround) hacks.bot.entity.velocity = hacks.bot.entity.velocity.offset(0, 0.5, 0)
    
                    if (!(controlStates[0] || controlStates[2])) {
                        if (controlStates[1]) {
                        } else if (controlStates[3]) yaw + Math.PI;
                    } else if (controlStates[0]) {
                        yaw += Math.PI / 2;
                        if (controlStates[1]) yaw += yaw < Math.PI ? Math.PI / 4 : -Math.PI / 4;
                        else if (controlStates[3]) yaw -= yaw < Math.PI ? Math.PI / 4 : -Math.PI / 4;
                    } else if (controlStates[1]) {
                        yaw += (3 * Math.PI) / 2;
                        if (controlStates[1]) yaw += yaw < Math.PI ? Math.PI / 4 : -Math.PI / 4;
                        else if (controlStates[3]) yaw -= yaw < Math.PI ? Math.PI / 4 : -Math.PI / 4;
                    }
    
                    const newX = Math.sin(yaw + Math.PI / 2);
                    const newZ = Math.cos(yaw + Math.PI / 2);
                    if (hacks.bot.entity.onGround) {
                        hacks.bot.entity.velocity = hacks.bot.entity.velocity.set(groundSpeedMultiplier * newX, vel.y, groundSpeedMultiplier * newZ);
                    } else {
                        hacks.bot.entity.velocity = hacks.bot.entity.velocity.set(airSpeedMultiplier * newX, vel.y, airSpeedMultiplier * newZ);
                    }
                    break;
    
                case "forward": 
    
                    break;
    
    
                    
                default:
                    hacks.speed.enabled = false
                    hacks.unload("speed");
                
            }
        }
    }
};
