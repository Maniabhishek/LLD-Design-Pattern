import type { ILogAppender } from "../core/ILogAppender.js";
import type { ILogFormatter } from "../core/ILogFormatter.js";
import { LogLevel } from "../core/LogLevel.js";
import { LogMessage } from "../core/LogMessage.js";
import { SimpleFormatter } from "../formatters/simpleFormatter.js";

export class ConsoleAppender implements ILogAppender {
    loglevel: LogLevel;
    logFormatter: ILogFormatter;
    constructor(){
        this.loglevel = LogLevel.DEBUG;
        this.logFormatter = new SimpleFormatter()
    }

    append(message: LogMessage): void {
        const level = message.getLevel();
        if(level && !this.isEnabled(level)){
            return;
        }
        const formattedMessage = this.logFormatter.format(message);
        
        if(level && (level == LogLevel.ERROR || level == LogLevel.FATAL)){
            console.error(formattedMessage);
        }else {
            console.log(formattedMessage);
        }
    }

    setLevel(logLevel: LogLevel): void {
        this.loglevel = logLevel;
    }

    getLevel(): LogLevel {
        return this.loglevel;
    }

    isEnabled(level: LogLevel): boolean {
        return this.loglevel.isGreaterOrEqual(level);
    }

    setFormatter(formatter: ILogFormatter): void {
        this.logFormatter = formatter;
    }

    getFormatter(): ILogFormatter {
        return this.logFormatter;
    }
}