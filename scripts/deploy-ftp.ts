import fs from "node:fs";
import path from "node:path";

import { Client } from "basic-ftp";

const OUT_DIR = path.join(process.cwd(), "out");

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }

  return value;
}

async function uploadDirectory(client: Client, localDir: string, remoteDir: string): Promise<void> {
  const entries = fs.readdirSync(localDir, { withFileTypes: true });

  await client.ensureDir(remoteDir);

  for (const entry of entries) {
    const localPath = path.join(localDir, entry.name);
    const remotePath = `${remoteDir}/${entry.name}`.replace(/\/+/g, "/");

    if (entry.isDirectory()) {
      await uploadDirectory(client, localPath, remotePath);
      continue;
    }

    await client.uploadFrom(localPath, remotePath);
  }
}

async function main(): Promise<void> {
  if (!fs.existsSync(OUT_DIR)) {
    throw new Error(`Build folder not found: ${OUT_DIR}. Run npm run build first.`);
  }

  const host = requireEnv("FTP_HOST");
  const user = requireEnv("FTP_USER");
  const password = requireEnv("FTP_PASSWORD");
  const remoteDir = (process.env.FTP_REMOTE_DIR ?? "/").replace(/\/+$/, "") || "/";
  const secure = process.env.FTP_SECURE === "true";

  const client = new Client(60_000);
  client.ftp.verbose = process.env.FTP_VERBOSE === "true";

  try {
    await client.access({ host, user, password, secure });
    console.log(`[deploy:ftp] Connected to ${host}, uploading out/ → ${remoteDir}`);
    await uploadDirectory(client, OUT_DIR, remoteDir);
    console.log("[deploy:ftp] Done.");
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error("[deploy:ftp] failed:", error);
  process.exit(1);
});
