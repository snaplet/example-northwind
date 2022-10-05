import { netlify } from "./netlify.js";

async function getAccountId(options) {
  const { siteId } = options;

  const [{ account_name, account_slug }, accounts] = await Promise.all([netlify(`sites/${siteId}`), netlify("accounts")]);

  const account = accounts.find(account => account.name === account_name && account.slug === account_slug);

  return account.id;
}

export async function setEnvironmentVariable(options) {
  const { siteId, branch, name, value } = options;

  const accountId = await getAccountId({ siteId });

  await netlify(
    `accounts/${accountId}/env/${name}?site_id=${siteId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        context: "branch",
        context_parameter: branch,
        value,
      }),
    }
  );
}