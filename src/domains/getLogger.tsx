export const getLogger = makeGetLogger({
  appName: "Keeper",
  console,
});

export function makeGetLogger(deps: { appName?: string; console: Console }) {
  return function getLogger(serviceName?: string) {
    const appNamePrefix = deps.appName ? deps.appName : "";
    const serviceNamePrefix = serviceName ? serviceName : "";
    const prefix =
      [appNamePrefix, serviceNamePrefix].filter(Boolean).join(" ▶ ") + " ▶";
    const coloredPrefix = style(prefix).cyan().bold().toString();

    const childLogger = {
      log(message: string, data?: Record<string, any>) {
        const prettyData = getPrettyData(data);
        deps.console.log(
          [coloredPrefix, message, prettyData].filter(Boolean).join(" ").trim(),
        );
      },

      info(message: string, data?: Record<string, any>) {
        const infoLabel = style("INFO").bold().blue().toString();
        const prettyData = getPrettyData(data);

        deps.console.info(
          [coloredPrefix, infoLabel, message, prettyData]
            .filter(Boolean)
            .join(" "),
        );
      },

      warn(message: string, data?: Record<string, any>) {
        const warnLabel = style("WARN").bold().yellow().toString();
        const prettyData = getPrettyData(data);

        deps.console.warn(
          `${[coloredPrefix, warnLabel, message].filter(Boolean).join(" ")} ${prettyData}`,
        );
      },
      error(message: string, data?: Record<string, any> & { error?: any }) {
        const errorLabel = style("ERROR").bold().red().toString();
        const prefixLabel = style(prefix).bold().yellow().toString();

        const { error, ...rest } = data || {};

        const prettyData = getPrettyData(rest);
        console.warn("prefixLabel", `"${prefixLabel}`);
        console.warn("errorLabel", `"${errorLabel}`);
        console.warn("message", `"${message}`);
        const log = [prefixLabel, errorLabel, message]
          .filter(Boolean)
          .join(" ");
        if (error) {
          deps.console.error(`${log} ${prettyData}\n`, error);
        } else {
          deps.console.error(`${log} ${prettyData}`);
        }
        return log;
      },
    };

    return childLogger;
  };
}

function getPrettyData(data?: Record<string, any>) {
  if (!data) {
    return "";
  }
  return `\n${style(JSON.stringify(data, null, 2)).dim()}`;
}

function style(msg: string) {
  let styled = msg;
  return {
    blue(this) {
      styled = `\x1b[34m${styled}\x1b[0m`;
      return this;
    },
    red(this) {
      styled = `\x1b[31m${styled}\x1b[0m`;
      return this;
    },
    green(this) {
      styled = `\x1b[32m${styled}\x1b[0m`;
      return this;
    },
    yellow(this) {
      styled = `\x1b[33m${styled}\x1b[0m`;
      return this;
    },
    cyan(this) {
      styled = `\x1b[36m${styled}\x1b[0m`;
      return this;
    },
    magenta(this) {
      styled = `\x1b[35m${styled}\x1b[0m`;
      return this;
    },
    dim(this) {
      styled = `\x1b[2m${styled}\x1b[0m`;
      return this;
    },
    bold(this) {
      styled = `\x1b[1m${styled}\x1b[0m`;
      return this;
    },
    italic(this) {
      styled = `\x1b[3m${styled}\x1b[0m`;
      return this;
    },
    toString() {
      return styled;
    },
  };
}
