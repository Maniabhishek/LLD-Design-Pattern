import { LogLevel } from "./LogLevel.js";

export class LogMessage {
    private timestamp: Date;
    private level: LogLevel | undefined;
    private message?: string | undefined;
    private source?: string | undefined;

    constructor(timestamp: Date, level?: LogLevel, message?: string, source?: string){
        this.timestamp = timestamp;
        this.level = level;
        this.message = message;
        this.source = source;
    }

    toString(): string {
        const timestampStr = this.timestamp.toISOString();
        const levelStr = this.level ? this.level.toString() : "UNKNOWN";
        const messageStr = this.message || "";
        const sourceStr = this.source || "";

        return `[${timestampStr}] [${levelStr}] [${sourceStr}] ${messageStr}`;
    }

    getLevel(): LogLevel | undefined {
        return this.level;
    }

    getLevelName(): string {
        return this.level ? this.level.getLevelName() : "UNKNOWN";
    }

    getMessage(): string | undefined {
        return this.message;
    }

    getSource(): string | undefined {
        return this.source;
    }

    getTimestamp(): Date {
        return this.timestamp;
    }
}

export class LogBuilder {
    public timestamp: Date = new Date();
    public level?: LogLevel;
    public message?: string;
    public source?: string;

    setTimeStamp(timestamp: Date): LogBuilder{
        this.timestamp = timestamp;
        return this
    }

    setlevel(level: LogLevel): LogBuilder{
        this.level = level;
        return this;
    }

    setMessage(message: string): LogBuilder{
        this.message = message;
        return this;
    }

    setSource(source: string): LogBuilder{
        this.source = source;
        return this;
    }

    build(): LogMessage {
        const logMessage = new LogMessage(this.timestamp, this.level, this.message, this.source);
        return logMessage;
    }
}