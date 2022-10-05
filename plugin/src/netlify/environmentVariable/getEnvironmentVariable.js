import { netlify } from "../netlify.js";

/**
 * @param {{ accountId: string, siteId: string, key: string }} options
 */
export async function getEnvironmentVariable(options) {
  const { accountId, siteId, key } = options;

  try {
    /** @type {{ values: { context: string, context_parameter?: string }[]}} */
    const environmentVariable = await netlify(`accounts/${accountId}/env/${key}?site_id=${siteId}`);

    return environmentVariable;
  } catch (_) {
    return null;
  }
}