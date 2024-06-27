export const getLogger = makeGetLogger({
  appName: "Storied",
  console,
});

export function makeGetLogger(deps: { appName?: string; console: Console }) {
  return function getLogger(serviceName?: string) {
    const appNamePrefix = deps.appName ? deps.appName : "";
    const serviceNamePrefix = serviceName ? serviceName : "";
    const prefix =
      [appNamePrefix, serviceNamePrefix].filter(Boolean).join(" ▶ ") + " ▶";

    const childLogger = {
      log(message: string, data?: Record<string, any>) {
        const prettyData = getPrettyData(data);
        deps.console.log(
          [prefix, message, prettyData].filter(Boolean).join(" ").trim(),
        );
      },

      info(message: string, data?: Record<string, any>) {
        const prettyData = getPrettyData(data);

        deps.console.info(
          [prefix, "INFO", message, prettyData].filter(Boolean).join(" "),
        );
      },

      warn(message: string, data?: Record<string, any>) {
        const prettyData = getPrettyData(data);

        deps.console.warn(
          `${[prefix, "WARN", message].filter(Boolean).join(" ")} ${prettyData}`,
        );
      },
      error(message: string, data?: Record<string, any> & { error?: any }) {
        const { error, ...rest } = data || {};

        const prettyData = getPrettyData(rest);
        const log = [prefix, "ERROR", message].filter(Boolean).join(" ");
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
  return `\n${JSON.stringify(data, null, 2)}`;
}
