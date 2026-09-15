// export enum LogLevel {
//     DEBUG = 1,
//     INFO = 2,
//     WARNING = 3,
//     ERROR = 4,
//     FATAL = 5
// }

export class LogLevel {
    static readonly DEBUG = new LogLevel(1)
    static readonly INFO = new LogLevel(2)
    static readonly WARNING = new LogLevel(3)
    static readonly ERROR = new LogLevel(4)
    static readonly FATAL = new LogLevel(5)

    private constructor(private readonly priority: number){}

    isGreaterOrEqual(level: LogLevel): boolean {
        return this.priority <= level.priority
    }

    getLevelName(): string {
        switch(this.priority){
            case 1:
                return "DEBUG"
            case 2:
                return "INFO"
            case 3:
                return "WARNING"
            case 4:
                return "ERROR"
            case 5:
                return "FATAL"
            default:
                return "UNKNOWN"
        }
    }
}
