import { ModuleManifest } from "@ecoflow/types";
const manifest: () => ModuleManifest = () => ({
  name: "Common",
  specs: [
    {
      name: "Request",
      type: "Request",
    },
    {
      name: "Text",
      type: "Middleware",
      inputs: [
        {
          name: "sampleText",
          type: "String",
          label: "Text",
        },
      ],
      controller: "middleware",
    },
    {
      name: "Response",
      type: "Response",
      controller: "response",
    },
    {
      name: "Debug",
      type: "Debug",
      controller: "debug",
    },
    {
      name: "Event Listener",
      type: "EventListener",
      controller: "eventListener",
    },
    {
      name: "Event Emitter",
      type: "EventEmitter",
      inputs: [
        {
          name: "fromPayload",
          type: "Checkbox",
          label: "From Payload",
          hint: "For from Payload enter the payload key instead of actual payload in the payload field.",
        },
      ],
      controller: "eventEmitter",
    },
  ],
});

module.exports = manifest;
