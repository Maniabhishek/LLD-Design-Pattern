import type { LogMessage } from "./LogMessage.js";

export interface ILogFormatter {
    /**
     * Formats a log message into a string representation.
     * @param message The log message to format
     * @return The formatted string
     */
    format(logMessage: LogMessage): string;

    setPattern(pattern: string): void;

    getPattern(): string;

    setDateFormat(dateFormat: string): void;

    getDateFormat(): string;
}