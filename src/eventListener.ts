async function eventListener(
  inputs?: { [key: string]: any },
  callback?: (...args: any[]) => void
) {
  const { socket, _, log } = ecoFlow;

  if (!socket || _.isEmpty(inputs)) {
    socket.emit("socket-error", {
      error: true,
      status: "failed",
      message: "Invalid event emitter inputs",
    });
    return;
  }

  const { listenerMode, eventChannel } = inputs;

  if (
    !listenerMode ||
    !eventChannel ||
    _.isEmpty(listenerMode) ||
    _.isEmpty(eventChannel)
  ) {
    socket.emit("socket-error", {
      error: true,
      status: {
        listenerMode: _.isEmpty(listenerMode),
        eventChannel: _.isEmpty(eventChannel),
      },
      message: "Invalid event channel",
    });
    return;
  }

  switch (listenerMode) {
    case "ON":
      socket.on("connection", (socket) => {
        socket.on(
          eventChannel,
          (...args: any[]) =>
            callback?.(args) ||
            log.info(_.isString(args) ? args : JSON.stringify(args))
        );
      });
      break;

    case "ONCE":
      socket.on("connection", (socket) => {
        socket.once(
          eventChannel,
          (...args: any[]) =>
            callback?.(args) ||
            log.info(_.isString(args) ? args : JSON.stringify(args))
        );
      });
      break;

    case "ANY":
      socket.on("connection", (socket) => {
        socket.onAny(
          (...args: any[]) =>
            callback?.(args) ||
            log.info(_.isString(args) ? args : JSON.stringify(args))
        );
      });
      break;

    default:
  }
}
export default eventListener;
