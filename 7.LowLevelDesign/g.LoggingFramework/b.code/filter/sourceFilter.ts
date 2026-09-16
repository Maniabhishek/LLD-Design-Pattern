import type { ILogFilter } from "../core/ILogFilter.js";
import { LogLevel } from "../core/LogLevel.js";
import { LogMessage } from "../core/LogMessage.js";

export class SourceFilter implements ILogFilter {
    level: LogLevel;
    constructor(private source: string) {
        this.level = LogLevel.INFO; // Default level, can be changed later using setLevel
    }

    shouldLog(message: LogMessage): boolean | undefined {
        const messageSource = message.getSource();
        if (!messageSource) {
            return false; // If the log message doesn't have a source, we can't determine if it should be logged.
        }
        return messageSource.includes(this.source);
    }

    getLevel(): LogLevel {
        return this.level;
    }
    
    setLevel(logLevel: LogLevel): void {
        this.level = logLevel;
    }

    setSource(source: string): void {
        this.source = source;
    }

    getSource(): string {
        return this.source;
    }
}