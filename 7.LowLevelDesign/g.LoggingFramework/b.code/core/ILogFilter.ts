import type { LogLevel } from "./LogLevel.js";
import { LogMessage } from "./LogMessage.js";

export interface ILogFilter {
    shouldLog(message: LogMessage): boolean | undefined;
    setLevel(logLevel: LogLevel): void;
    getLevel(): LogLevel;
}