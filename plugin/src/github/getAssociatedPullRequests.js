import { github } from "./github.js";

/**
 * @param {{ commitRef: string }} options
 * @returns {Promise<{ head: { ref: string } }[]>}
 */
export async function getAssociatedPullRequests(options) {
  const associatedPullRequests = await github(`commits/${options.commitRef}/pulls`);

  return associatedPullRequests;
}