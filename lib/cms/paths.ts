import path from "node:path";

export const CMS_DATA_DIR = path.join(process.cwd(), ".cms-data");

export function cmsDataPath(fileName: string): string {
  return path.join(CMS_DATA_DIR, fileName);
}
