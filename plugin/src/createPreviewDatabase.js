import { getPreviewDatabaseUrl } from "./getPreviewDatabaseUrl.js";

async function isPreviewDatabaseDeployed(ctx, options) {
  const { databaseUrlCommand } = options;

  try {
    await getPreviewDatabaseUrl(ctx, { databaseUrlCommand });
    return true;
  } catch (_) {
    return false;
  }
}

export async function createPreviewDatabase(ctx, options) {
  const { databaseCreateCommand, databaseUrlCommand, reset } = options;

  const previewDatabaseIsDeployed = await isPreviewDatabaseDeployed(ctx, { databaseUrlCommand });

  if (!previewDatabaseIsDeployed || reset) {
    console.log("Creating a preview database...");
    await ctx.run.command(databaseCreateCommand, { env: { PATH: `/opt/buildhome/.local/bin/:${process.env.PATH}` } });
    console.log("Preview database created");
  }
}