import { Bot, BotEvents } from "mineflayer";
import { goals } from "mineflayer-pathfinder";
import { Entity } from "prismarine-entity";
import { stringify } from "querystring";
import { Vec3 } from "vec3";
import { uuid } from "./hackUtil";

/**
 * TODO:  add everything. Lol.
 * Modularize this entire thing.
 * Import local files, add to mapping.
 * Add a remover as well to dynamically control these.
 * Neat idea, me. Thanks! -Gen
 */

import fs from "fs";
import path from "path";
import { HackOpts } from "./hackTypes/hackFormat";
import { StaticHackOpts } from "./hackTypes/staticHackFormat";


interface jesusConfig {
    enabled: boolean;
    mode: string | "trampoline" | "solid"
}

interface highJumpConfig {
    enabled: boolean;
    height: number;
}

interface noFallConfig {
    enabled: boolean;
    updateMineflayer: boolean;
}

interface KBCancelConfig {
    enabled: boolean;
    updateMineflayer: boolean;
}

interface slowFallConfig {
    enabled: boolean;
    maxFallSpeed: number;
}

type speedMode = "strafe" | "forward" | "strict" | "strafe strict";
interface speedConfig {
    enabled: boolean;
    mode: speedMode; // this... doesn't work? weird.
    onlyGround: boolean; // will be deprecated. lol
    groundSpeedMultiplier: number;
    airSpeedMultiplier: number;
}

type stepMode = "vanilla" | "packet" | "ncp";
interface stepConfig {
    enabled: boolean;
    mode: stepMode;
    stepHeight: number;
    //updateMineflayer: boolean  // Assuming true here.
}

interface blinkConfig {
    enabled: boolean;
    timeout: number;
}

interface antiWaterConfig {
    enabled: boolean
}


interface hasteConfig {
    enabled: boolean
    mode: string
    level: number
}
export interface HackConfig {
    antiwater: antiWaterConfig;
    blink: blinkConfig;
    kbcancel: KBCancelConfig;
    highjump: highJumpConfig;
    jesus: jesusConfig;
    haste: hasteConfig
    nofall: noFallConfig;
    slowfall: slowFallConfig;
    speed: speedConfig;
    step: stepConfig;
}
export class RandomHacks implements HackConfig {
    private loadedHackListeners: Map<String, HackOpts<keyof BotEvents>> = new Map();
    private currentHackListeners: Map<String, HackOpts<keyof BotEvents>> = new Map();
    private loadedHacksStatic: Map<String, StaticHackOpts> = new Map();
    private currentHacksStatic: Map<String, StaticHackOpts> = new Map();
    public kbcancel = {
        enabled: false,
        updateMineflayer: true,
    };
    public antiwater = {
        enabled: false
    };
    public slowfall = {
        enabled: false,
        maxFallSpeed: -Math.abs(0.2), //You can put either negative or positive. Same result.
    };
    public nofall = {
        enabled: false,
        updateMineflayer: false,
    };
    public highjump = {
        enabled: false,
        height: 3,
    };
    public jesus = {
        enabled: true,
        mode: "solid"
    };
    public speed = {
        enabled: true,
        mode: "strafe" as speedMode,
        onlyGround: true,
        groundSpeedMultiplier: 0.3,
        airSpeedMultiplier: 0.3,
    };
    public step = {
        enabled: false,
        mode: "vanilla" as stepMode,
        stepHeight: 3,
    };

    public blink = {
        enabled: false,
        timeout: 3000,
    };

    public haste = {
        enabled: false,
        mode: "vanilla",
        level: 2
    };
    public lastGoal: any;

    constructor(public bot: Bot, public options?: Partial<HackConfig>) {
        const hackFiles = fs.readdirSync(path.join(__dirname, "hacks")).filter((file) => file.endsWith(".js"));
        for (const file of hackFiles) {
            const hackImport: any /* too tired to fix rn */ = require(path.join(__dirname, "hacks", file)).default;
            const hack = new hackImport(this);
            this.loadedHackListeners.set(hack.name, hack);
            // this.load(hack.name);
        }
        const staticHackFiles = fs.readdirSync(path.join(__dirname, "staticHacks")).filter((file) => file.endsWith(".js"));
        for (const file of staticHackFiles) {
            const hackImport: any /* too tired to fix rn */ = require(path.join(__dirname, "staticHacks", file)).default;
            const hack = new hackImport(this);
            this.loadedHacksStatic.set(hack.name, hack);
        }
    }

    unload(hackName: string): boolean {
        const hack = this.currentHackListeners.get(hackName);
        if (hack && this.currentHackListeners.has(hackName)) {
            this.bot.removeListener(hack.listenOn as keyof BotEvents, hack.listener);
            this.currentHackListeners.delete(hackName);
            return true;
        }
        return false;
    }

    load(hackName: string, forceEnable: boolean = false): boolean {
        const hack = this.loadedHackListeners.get(hackName);
        if (hack && (forceEnable || !this.currentHackListeners.has(hackName))) {
            if (hack.once) {
                this.bot.once(hack.listenOn as keyof BotEvents, hack.listener);
            }
            else {
                this.bot.on(hack.listenOn as keyof BotEvents, hack.listener);
            }
            this.currentHackListeners.set(hackName, hack);
            return true;
        }
        return false;
    }

    async run(staticHackName: string, ...args: any): Promise<boolean> {
        const hack = this.loadedHacksStatic.get(staticHackName);
        if (hack) {
            await hack.execute(...args);
            return true;
        }
        return false;
    }

    enableBlink(): boolean {
        if (!this.blink.enabled) {
            this.blink.enabled = true;
            this.bot.enableBlink();
            return true;
        }
        return false;
    }

    disableBlink(): boolean {
        if (this.blink.enabled) {
            this.blink.enabled = false;
            this.bot.disableBlink();
            return true;
        }
        return false;
    }
}
