import type { ILogFormatter } from "./ILogFormatter.js";
import { LogLevel } from "./LogLevel.js";
import { LogMessage } from "./LogMessage.js";

export interface ILogAppender {
    // appends a log message to this appender's destination
    append(message: LogMessage): void;
    
    // sets the minimum log level for this appender. Messages below this level will be ignored.
    setLevel(logLevel: LogLevel): void;

    // gets the minimum log level for this appender. Messages below this level will be ignored.
    getLevel(): LogLevel;

    // checks if the given log level is enabled for this appender. Returns true if the log level is greater than or equal to the appender's minimum log level, false otherwise.
    isEnabled(level: LogLevel): boolean;
    
    // sets the formatter for this appender.
    setFormatter(formatter: ILogFormatter): void;

    // get the current formatter for this appender.
    getFormatter(): ILogFormatter;
}
