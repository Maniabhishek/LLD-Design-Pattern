import type { ILogFormatter } from "../core/ILogFormatter.js";
import { LogLevel } from "../core/LogLevel.js";
import { LogMessage } from "../core/LogMessage.js";

export class DetailedFormatter implements ILogFormatter {
    private dateFormat: string;
    private datetimeFormat: Intl.DateTimeFormat;
    private pattern: string = "";
    constructor() {
        this.dateFormat = "YYYY-MM-DD";
        this.pattern = "[%LEVEL] %TIMESTAMP %SOURCE - %MESSAGE";
        this.datetimeFormat = Intl.DateTimeFormat("en-CA", {
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
        const timestamp = this.datetimeFormat.format(logMessage.getTimestamp());
        if (!this.pattern || !this.pattern.trim()) {
            return `[${logMessage.getLevel()}] ${timestamp} ${logMessage.getSource()} - ${logMessage.getMessage()}`;
        }
        return this.pattern.replace("%LEVEL", logMessage.getLevelName() || "")
            .replace("%TIMESTAMP", timestamp)
            .replace("%MESSAGE", logMessage.getMessage() || "")
            .replace("%SOURCE", logMessage.getSource() || "");
    }

    setPattern(pattern: string): void {
        // This formatter does not support custom patterns.
        this.pattern = pattern
    }

    getPattern(): string {
        return this.pattern;
    }

    setDateFormat(dateFormat: string): void {
        this.dateFormat = dateFormat;
        // Update the datetimeFormat based on the new date format
        this.datetimeFormat = new Intl.DateTimeFormat("en-US", {
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