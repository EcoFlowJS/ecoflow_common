import { EcoContext } from "@ecoflow/types";

async function middleware(this: EcoContext) {
  this.payload.msg = this.inputs?.sampleText || null;
  this.next();
}

module.exports = middleware;
