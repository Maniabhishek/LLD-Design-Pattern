import type { ILogFilter } from "../core/ILogFilter.js";
import { LogLevel } from "../core/LogLevel.js";
import { LogMessage } from "../core/LogMessage.js";

export class LevelFilter implements ILogFilter {
    private level: LogLevel;

    constructor(level: LogLevel) {
        this.level = level;
    }

    shouldLog(message: LogMessage): boolean | undefined {
        const level = message.getLevel();
        if (!level) {
            return false; // If the log message doesn't have a level, we can't determine if it should be logged.
        }
        return this.level.isGreaterOrEqual(level);
    }

    setLevel(logLevel: LogLevel): void {
        this.level = logLevel;
    }

    getLevel(): LogLevel {
        return this.level;
    }
}