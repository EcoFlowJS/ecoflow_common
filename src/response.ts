import { EcoContext } from "@ecoflow/types";

async function response(this: EcoContext) {
  return [this.inputs?.responseKey, this.payload[this.inputs?.responseKey]];
}

module.exports = response;
