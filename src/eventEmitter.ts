import { EcoContext } from "@ecoflow/types";

async function eventEmitter(ctx: EcoContext) {
  const { socket, _ } = ecoFlow;
  const { inputs, payload } = ctx;

  if (!inputs || _.isEmpty(inputs)) {
    socket.emit("socket-error", {
      error: true,
      status: "failed",
      message: "Invalid event emitter inputs",
    });
    return;
  }

  const { eventChannel, emitterPayload, fromPayload } = inputs;

  if (
    !eventChannel ||
    !emitterPayload ||
    _.isEmpty(eventChannel) ||
    _.isEmpty(emitterPayload)
  ) {
    socket.emit("socket-error", {
      error: true,
      status: {
        eventChannel: _.isEmpty(eventChannel),
        emitterPayload: _.isEmpty(emitterPayload),
        fromPayload: _.isEmpty(fromPayload),
      },
      message: "Invalid event emitter payload",
    });
    return;
  }

  socket.emit(
    eventChannel,
    fromPayload ? payload[emitterPayload] : emitterPayload
  );
  socket.emit("socket-message", {
    status: "success",
    message: `Event ${eventChannel} emitted successfully`,
  });
}

export default eventEmitter;
