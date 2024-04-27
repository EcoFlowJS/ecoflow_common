import { EcoContext } from "@ecoflow/types";

async function debug(this: EcoContext) {
  const { _, server, log } = ecoFlow;
  if (_.isUndefined(this.inputs))
    this.inputs = {
      ...this.inputs,
      debugOutput: "Complete",
      debugExp: "",
      debugConsole: ["WebConsole"],
    };

  const { inputs, debugPayload } = this;
  const { debugOutput, debugExp, debugConsole } = inputs!;
  const result = Object.create({});

  switch (debugOutput) {
    case "Message":
      result.msg = debugPayload.msg || {};
      break;

    case "Complete":
      result.msg = debugPayload;
      break;
    case "Expression":
      if (!_.isString(debugExp) || _.isEmpty(debugExp))
        result.msg = debugPayload;
      else result.msg = debugPayload[debugExp] || {};
      break;

    default:
      result.msg = debugPayload;
  }

  if (debugConsole.includes("WebConsole"))
    server.systemSocket.emit("DebugWebConsole", result.msg);

  if (debugConsole.includes("Terminal"))
    log.info(_.isString(result.msg) ? result.msg : JSON.stringify(result.msg));
}

module.exports = debug;
