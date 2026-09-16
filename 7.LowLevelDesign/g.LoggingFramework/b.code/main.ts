import { LogConfiguration } from "./src/core/LogConfiguration.js";
import { LoggerImpl } from "./src/core/LoggerImpl.js";
import { LogLevel } from "./src/core/LogLevel.js";
import { LevelFilter } from "./src/filter/levelFilter.js";

class LoggingDemo {
    initialize() {
        // debugBasicLogging();
        this.debugBasicLogging();
    }

    debugBasicLogging(){
        const logConfig = new LogConfiguration();
        const logger = new LoggerImpl("BasicLogger", logConfig, true)
        logger.info("This is an info message");
        logger.debug("This is a debug message");
        logger.warning("This is a warning message");
        logger.error("This is an error message");
        logger.fatal("This is a fatal message");  
        console.log('--------------------------------')
        const levelFilter = new LevelFilter(LogLevel.ERROR)
        logConfig.setRootLevel(LogLevel.ERROR);
        logger.addFilter(levelFilter)
        logger.info("This is an info message");
        logger.debug("This is a debug message");
        logger.warning("This is a warning message");
        logger.error("This is an error message");
        logger.fatal("This is a fatal message");  
    }
}

new LoggingDemo().initialize();
