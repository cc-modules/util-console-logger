var LogLevel;
(function(LogLevel) {
  LogLevel[LogLevel["VERBOSE"] = 0] = "VERBOSE";
  LogLevel[LogLevel["LOG"] = 1] = "LOG";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
  LogLevel[LogLevel["FATAL"] = 5] = "FATAL";
  LogLevel[LogLevel["SILENT"] = Infinity] = "SILENT";
})(LogLevel || (LogLevel = {}));
const LogLevels = {
  VERBOSE: LogLevel.VERBOSE,
  LOG: LogLevel.LOG,
  INFO: LogLevel.INFO,
  WARN: LogLevel.WARN,
  ERROR: LogLevel.ERROR,
  SILENT: LogLevel.SILENT,
};
export default class ConsoleLogger {
  /**
   * ConsoleLogger构造函数
   *
   * @param   {string}  prefix  Logger输出前缀
   *
   * @return  {ConsoleLogger}
   */
  constructor(prefix) {
    this.Levels = LogLevels;
    this.level = LogLevel.LOG;
    this.prefix = '';
    this.enabled = true;
    this.debugColor = colorize('#cccccc', 12);
    this.logColor = colorize('#bbbbbb', 12);
    this.infoColor = colorize('#2196f3', 12);
    this.warnColor = colorize('#ff00ff', 12);
    this.errorColor = colorize('#e91e63', 12);
    this.fatalColor = colorize('#9a0101', 13);
    this.setPrefix(prefix);
    this.level = ConsoleLogger.level;
    ConsoleLogger.instances.push(this);
  }
  static setLevel(level) {
    this.level = level;
    this.instances.forEach(logger => logger.setLevel(level));
  }
  static enable(level) {
    if (level)
      this.level = level;
    this.instances.forEach(logger => logger.enable());
  }
  static disable() {
    this.instances.forEach(logger => logger.disable());
  }
  setPrefix(prefix) {
    this.prefix = prefix;
  }
  enable(level = this.level) {
    this.level = level;
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
  }
  /**
   * 设置日志等级，只有当日志函数高于当前级别才会产生输出
   *
   * @param   {LogLevel}  level
   *
   * @return  {void}
   */
  setLevel(level) {
    this.level = level;
  }
  trace(title, ...args) {
    if (!this.enabled || this.level > LogLevel.VERBOSE)
      return;
    if (ConsoleLogger.noColor) {
      console.trace(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.trace(`%c[${this.prefix}] ${title}`, this.debugColor, ...args);
    }
  }
  debug(title, ...args) {
    if (!this.enabled || this.level > LogLevel.VERBOSE)
      return;
    if (ConsoleLogger.noColor) {
      console.debug(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.debug(`%c[${this.prefix}] ${title}`, this.debugColor, ...args);
    }
  }
  log(title, ...args) {
    if (!this.enabled || this.level > LogLevel.LOG)
      return;
    if (ConsoleLogger.noColor) {
      console.log(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.log(`%c[${this.prefix}] ${title}`, this.logColor, ...args);
    }
  }
  info(title, ...args) {
    if (!this.enabled || this.level > LogLevel.INFO)
      return;
    if (ConsoleLogger.noColor) {
      console.info(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.info(`%c[${this.prefix}] ${title}`, this.infoColor, ...args);
    }
  }
  warn(title, ...args) {
    if (!this.enabled || this.level > LogLevel.WARN)
      return;
    if (ConsoleLogger.noColor) {
      console.warn(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.warn(`%c[${this.prefix}] ${title}`, this.warnColor, ...args);
    }
  }
  error(title, ...args) {
    if (!this.enabled || this.level > LogLevel.ERROR)
      return;
    if (ConsoleLogger.noColor) {
      console.error(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.error(`%c[${this.prefix}] ${title}`, this.errorColor, ...args);
    }
  }
  fatal(title, ...args) {
    if (!this.enabled || this.level > LogLevel.FATAL)
      return;
    if (ConsoleLogger.noColor) {
      console.error(`[${this.prefix}] ${title}`, ...args);
    } else {
      console.error(`%c[${this.prefix}] ${title}`, this.fatalColor, ...args);
    }
  }
  group(...label) {
    if (console.group)
      console.group(...label);
  }
  groupCollapsed(...label) {
    if (console.groupCollapsed)
      console.groupCollapsed(...label);
  }
  groupEnd() {
    if (console.groupEnd)
      console.groupEnd();
  }
}
ConsoleLogger.instances = [];
ConsoleLogger.level = LogLevel.LOG;
ConsoleLogger.Levels = LogLevels;
ConsoleLogger.noColor = false;

function colorize(hex, x) {
  return `color:${hex};font-size:${x}px;`;
}