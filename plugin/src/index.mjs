import fetch from "node-fetch";

// patch the PATH to include the snaplet CLI
process.env.PATH = `/opt/buildhome/.local/bin/:${process.env.PATH}`;

async function netlify(path, options) {
  const response = await fetch(`https://api.netlify.com/api/v1/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Netlify API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function installSnapletCLI(ctx) {
  await ctx.run.command("curl -sL https://app.snaplet.dev/get-cli/ | bash &> /dev/null", { preferLocal: false });
}

async function getPreviewDatabaseUrl(ctx, options) {
  const { databaseUrlCommand } = options;

  const { stdout: databaseUrl } = await ctx.run.command(databaseUrlCommand);

  return databaseUrl;
}

async function isPreviewDatabaseDeployed(ctx, options) {
  const { databaseUrlCommand } = options;

  try {
    await getPreviewDatabaseUrl(ctx, { databaseUrlCommand });
    return true;
  } catch (_) {
    return false;
  }
}

async function createPreviewDatabase(ctx, options) {
  const { databaseCreateCommand, databaseUrlCommand, reset } = options;

  const previewDatabaseIsDeployed = await isPreviewDatabaseDeployed(ctx, { databaseUrlCommand });

  if (!previewDatabaseIsDeployed || reset) {
    console.log("Creating a preview database...");
    await ctx.run.command(databaseCreateCommand);
    console.log("Preview database created");
  }
}

async function getAccountId(options) {
  const { siteId } = options;

  const [{ account_name, account_slug }, accounts] = await Promise.all([netlify(`sites/${siteId}`), netlify("accounts")]);

  const account = accounts.find(account => account.name === account_name && account.slug === account_slug);

  return account.id;
}

async function setEnvironmentVariable(options) {
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

export async function onPreBuild({
  utils: { run },
  constants,
  netlifyConfig,
  inputs: {
    databaseEnvVar = "DATABASE_URL",
    databaseCreateCommand = "snaplet db create --git --latest",
    databaseUrlCommand = "snaplet db url --git",
    reset = false,
  },
}) {
  if (process.env.CONTEXT === "deploy-preview") {
    const { BRANCH: branch } = netlifyConfig.build.environment;

    await installSnapletCLI({ run });

    await createPreviewDatabase({ run }, {
      databaseCreateCommand,
      databaseUrlCommand,
      reset,
    });

    const databaseUrl = await getPreviewDatabaseUrl({ run }, {
      databaseUrlCommand,
    });

    console.log(`Setting environment variable ${databaseEnvVar} for branch ${branch}...`);
    await setEnvironmentVariable({
      siteId: constants.SITE_ID,
      branch,
      name: databaseEnvVar,
      value: databaseUrl,
    });
    console.log(`Environment variable ${databaseEnvVar} for branch ${branch} set.`);
  }
};
