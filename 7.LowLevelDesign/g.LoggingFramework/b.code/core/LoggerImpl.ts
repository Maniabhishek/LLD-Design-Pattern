import { ConsoleAppender } from "../appenders/consoleAppender.js";
import type { ILogAppender } from "./ILogAppender.js";
import type { ILogFilter } from "./ILogFilter.js";
import type { ILogger } from "./ILogger.js";
import { LogConfiguration } from "./LogConfiguration.js";
import { LogLevel } from "./LogLevel.js";
import { LogBuilder } from "./LogMessage.js";

export class LoggerImpl implements ILogger {
    private readonly name: string;
    private logLevel: LogLevel;
    private readonly appenders: ILogAppender[];
    private readonly filters: ILogFilter[];

    constructor(name: string, loggerConfiguration: LogConfiguration, addDefaultAppender: boolean = false){
        this.name = name
        this.logLevel = loggerConfiguration.getRootLevel()
        this.appenders = []
        this.filters = []  
        console.log(loggerConfiguration.getRootLevel().getLevelName())
        if(addDefaultAppender){
            this.addAppender(new ConsoleAppender())
        }
    }

    log(level: LogLevel, message: string): void {
        if(!this.logLevel.isGreaterOrEqual(level)){
            return
        }
        const logMessage = new LogBuilder().setTimeStamp(new Date()).setMessage(message).setlevel(level).setSource(this.name).build()

        // apply filters
        for(const filter of this.filters) {
            if(!filter.shouldLog(logMessage)){
                return
            }
        }
        
        // send to appenders
        for(const appender of this.appenders) {
            if(appender.isEnabled(level)) {
                appender.append(logMessage)
            }
        }
    }

    debug(message: string): void {
        this.log(LogLevel.DEBUG, message)
    }

    info(message: string): void {
        this.log(LogLevel.INFO, message)
    }

    warning(message: string): void {
        this.log(LogLevel.WARNING, message)
    }

    error(message: string): void {
        this.log(LogLevel.ERROR, message)
    }

    fatal(message: string): void {
        this.log(LogLevel.FATAL, message)
    }

    // setLevel
    setLogLevel(logLevel: LogLevel): void {
        this.logLevel = logLevel
    }

    // getLevel
    getLogLevel(): LogLevel {
        return this.logLevel
    }

    // addAppender
    addAppender(appender: ILogAppender): void {
        this.appenders.push(appender)
    }

    // getAppenders
    getAppenders(): ILogAppender[] {
        return this.appenders
    }

    getName(): string {
        return this.name
    }

    getFilters(): ILogFilter[] {
        return this.filters
    }

    addFilter(filter: ILogFilter): void {
        this.filters.push(filter)
    }

    removeFilter(filter: ILogFilter): void {
        const index = this.filters.indexOf(filter);
        if (index !== -1) {
            this.filters.splice(index, 1);
        }
    }

}