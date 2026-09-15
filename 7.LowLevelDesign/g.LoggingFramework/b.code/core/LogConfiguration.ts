import { LogLevel } from "./LogLevel.js";

export class LogConfiguration {
    private rootLevel: LogLevel;

    constructor(rootLevel: LogLevel = LogLevel.DEBUG){
        this.rootLevel = rootLevel;
    }

    getRootLevel(){
        return this.rootLevel
    }

    setRootLevel(rootLevel: LogLevel){
        this.rootLevel = rootLevel;
    }
}