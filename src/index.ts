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
  ],
});

module.exports = manifest;
