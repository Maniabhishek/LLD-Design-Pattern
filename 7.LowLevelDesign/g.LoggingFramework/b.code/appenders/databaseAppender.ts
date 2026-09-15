import type { ILogFormatter } from "../core/ILogFormatter.js";
import { LogLevel } from "../core/LogLevel.js";
import { LogMessage } from "../core/LogMessage.js";
import { SimpleFormatter } from "../formatters/simpleFormatter.js";

export interface DatabaseConnection {
    execute(query: string, params: any[]): Promise<void>;
}

export class DatabaseAppender {
    level: LogLevel = LogLevel.DEBUG;
    logFormatter: ILogFormatter ;
    connection: DatabaseConnection | null;

    constructor(logLevel: LogLevel = LogLevel.DEBUG){
        this.level = logLevel;
        this.logFormatter = new SimpleFormatter();
        this.connection = null;
    }

    setConnection(connection: DatabaseConnection): void {
        this.connection = connection;
    }

    append(message: LogMessage): void {
        if (!this.connection) {
            throw new Error("Database connection is not set.");
        }

        const level = message.getLevel();
        if(level && !this.isEnabled(level)){
            return;
        }

        const formattedMessage = this.logFormatter.format(message);
        const query = "INSERT INTO logs (level, message) VALUES (?, ?)";
        const params = [level?.toString(), formattedMessage];

        this.connection.execute(query, params).catch(err => {
            console.error("Failed to log message to database:", err);
        });
    }

    setLevel(logLevel: LogLevel): void {
        this.level = logLevel;
    }

    getLevel(): LogLevel {
        return this.level;
    }

    isEnabled(level: LogLevel): boolean {
        return level.isGreaterOrEqual(this.level)
    }

    setFormatter(formatter: ILogFormatter): void {
        this.logFormatter = formatter;
    }

    getFormatter(): ILogFormatter {
        return this.logFormatter;
    }
}