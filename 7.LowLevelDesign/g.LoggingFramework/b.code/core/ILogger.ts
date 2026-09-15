import type { ILogAppender } from "./ILogAppender.js";
import { LogLevel } from "./LogLevel.js";

export interface ILogger {
    debug(message: string): void;
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    fatal(message: string): void;

    // Generic logging method that takes a log level and message
    log(logLevel: LogLevel, message: string): void;

    // configuration methods
    setLogLevel(logLevel: LogLevel): void;
    addAppender(appender: ILogAppender): void;

    // Getter methods
    getLogLevel(): LogLevel;
    getAppenders(): ILogAppender[];

}