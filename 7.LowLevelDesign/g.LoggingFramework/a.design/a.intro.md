### Logging Framework
- framework is developed when same code or logic is required in multiple services or project , we can extract such logic or concept and create its own framework
- why do we need logging
  - well how do you debug your code , while debugging we need to print something in order to figure our the issue, now there can be multiple level of logging, logging based on environment so everytime we do that without having a framework we will have to use if condition at all the places son instead of that we can just create a framework 

### Step 1: Clarify Requirements
#### Functional Requirements (These contain the core logging operations which are as follows)
1. Log Levels with Priority System:
- Support 5 log levels: DEBUG, INFO, WARNING, ERROR, FATAL
- Each level has a priority (DEBUG=1, INFO=2, WARNING=3, ERROR=4, FATAL=5)
- Only log messages with priority ≥ configured level
- Example: If level is set to WARNING, only WARNING, ERROR, and FATAL messages are logged:

```ts
logger.setLevel(LogLevel.WARNING);
logger.debug("This won't be logged");    // Skipped
logger.info("This won't be logged");     // Skipped  
logger.warning("This will be logged");   // Logged
logger.error("This will be logged");     // Logged
```

2. Log Message Structure:
- Each log message contains: timestamp, level, message text, and optional source
- Timestamp: When the log was created
- Level: Severity of the message
- Message: What happened
- Source: Which class/method generated the log (optional)

```
// Creates: [2024-01-15 10:30:45] [ERROR] [PaymentService.processPayment] - 
// Payment failed for user 123
logger.error("Payment failed for user {}", userId);
```

3. Multiple Output Destinations:
- Console: Display logs in terminal/console (for development)
- File: Save logs to a file (for production)
- Database: Store logs in database (for analysis)
- Same log message can go to multiple destinations simultaneously

4. Configuration System:
- Set logging level for entire application
- Choose which output destinations to use
- Configure formatting rules
- Simple configuration without complex filtering

5. Thread Safety:
- Multiple threads can log simultaneously without data corruption
- No lost or mixed-up log messages
- Thread-safe operations for all logging components

6. Extensibility:
- Easy to add new output destinations (email, network, cloud storage)
- Easy to add new log levels if needed
- Easy to add custom formatting

7. Message Formatting:
- Customize how log messages appear in output
- Control timestamp format, level display, and message layout
- Different formats for different destinations

> Interview Tip: Confirm with the interviewer which destinations, formats, and levels are must-have features before designing the architecture. This ensures your solution meets their expectations while showing your attention to detail.
