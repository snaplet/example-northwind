import { createPreviewDatabase } from "./createPreviewDatabase.js"
import { getPreviewDatabaseUrl } from "./getPreviewDatabaseUrl.js";
import { installSnapletCLI } from "./installSnapletCLI.js";
import { setEnvironmentVariable } from "./setEnvironmentVariable.js";

const DEFAULT_INPUTS = {
  databaseEnvVar: "DATABASE_URL",
  databaseCreateCommand: "snaplet db create --git --latest",
  databaseUrlCommand: "snaplet db url --git",
  reset: false,
};

export async function onPreBuild({
  utils: { run },
  constants,
  netlifyConfig,
  inputs,
}) {
  const {
    databaseEnvVar,
    databaseCreateCommand,
    databaseUrlCommand,
    reset,
  } = { ...DEFAULT_INPUTS, ...inputs };

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
