import type { ILogFormatter } from "../core/ILogFormatter.js";
import { LogMessage } from "../core/LogMessage.js";

export class SimpleFormatter implements ILogFormatter {
    private pattern: string = "";
    private dateFormat: string;
    private dateTimeFormatter: Intl.DateTimeFormat;

    constructor(pattern: string = "[%LEVEL] %TIMESTAMP %MESSAGE", dateFormat: string = "YYYY-MM-DD HH:mm:ss") {
        this.pattern = pattern;
        this.dateFormat = dateFormat;
        this.dateTimeFormatter = new Intl.DateTimeFormat("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            });
    }

    format(logMessage: LogMessage): string {
        if(!this.pattern || !this.pattern.trim()){
            return `[${logMessage.getLevel()}] ${logMessage.getTimestamp()} ${logMessage.getMessage()}`;
        }

        // Implementation for formatting the log message
        return this.pattern.replace("%LEVEL", logMessage.getLevelName() || "")
            .replace("%TIMESTAMP", this.dateTimeFormatter.format(logMessage.getTimestamp()))
            .replace("%MESSAGE", logMessage.getMessage() || "")
            .replace("%SOURCE", logMessage.getSource() || "");
    }

    setPattern(pattern: string): void {
        this.pattern = pattern;
    }

    getPattern(): string {
        return this.pattern;
    }

    setDateFormat(dateFormat: string): void {
        this.dateFormat = dateFormat;
        // Update the dateTimeFormatter based on the new date format
        this.dateTimeFormatter = new Intl.DateTimeFormat("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
    }

    getDateFormat(): string {
        return this.dateFormat;
    }
}