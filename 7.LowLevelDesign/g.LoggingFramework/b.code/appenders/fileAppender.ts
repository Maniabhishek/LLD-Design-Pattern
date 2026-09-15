import type { ILogAppender } from "../core/ILogAppender.js";
import type { ILogFormatter } from "../core/ILogFormatter.js";
import { LogLevel } from "../core/LogLevel.js";
import type { LogMessage } from "../core/LogMessage.js";
import { SimpleFormatter } from "../formatters/simpleFormatter.js";
import * as fs from "node:fs";

export class FileAppender implements ILogAppender {
    loglevel: LogLevel = LogLevel.DEBUG;
    filePath: string;
    formatter: ILogFormatter;
    fileDescriptor: number | null = null;

    constructor(filePath: string) {
        this.formatter = new SimpleFormatter();
        this.loglevel = LogLevel.DEBUG;
        this.filePath = filePath;
        this.initializeWriter();
    }

    initializeWriter(): void {
        try {
            // opens the file in append mode, creating it if it doesn't exist
            this.fileDescriptor = fs.openSync(this.filePath, 'a');
        } catch (error) {
            console.error("Failed to initialize file writer:", error);
        }
    }

    append(logMessage: LogMessage): void {
        const level = logMessage.getLevel();
        if((level && !this.isEnabled(level) ) || !this.fileDescriptor){
            return;
        }

        try {
            const formattedMessage = this.formatter.format(logMessage);
            // Here you would implement the logic to write the formattedMessage to the file at this.filePath.
            // For example, using Node.js's fs module:
            fs.appendFileSync(this.filePath, formattedMessage + '\n');
        }catch(error) {
            console.error("Failed to append log message:", error);
        }
    }

    isEnabled(level: LogLevel): boolean {
        return level.isGreaterOrEqual(this.loglevel);
    }

    setLevel(logLevel: LogLevel): void {
        this.loglevel = logLevel;
    }

    getLevel(): LogLevel {
        return this.loglevel;
    }

    setFormatter(formatter: ILogFormatter): void {
        this.formatter = formatter;
    }

    getFormatter(): ILogFormatter {
        return this.formatter;
    }

    close(): void {
        if (this.fileDescriptor !== null) {
            fs.closeSync(this.fileDescriptor);
            this.fileDescriptor = null;
        }
    }
}