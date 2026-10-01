const DEFAULT_TIMEOUT_MS = 60_000;

export type DirectusListResponse<T> = {
  data: T[];
};

export function getDirectusConfig(): { url: string; token: string } | null {
  const url = process.env.DIRECTUS_URL?.replace(/\/$/, "");
  const token = process.env.DIRECTUS_TOKEN?.trim();

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

export async function directusGet<T>(
  path: string,
  searchParams?: Record<string, string>
): Promise<T> {
  const config = getDirectusConfig();
  if (!config) {
    throw new Error("DIRECTUS_URL and DIRECTUS_TOKEN are required");
  }

  const query = searchParams ? `?${new URLSearchParams(searchParams).toString()}` : "";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${config.url}${path}${query}`, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Directus ${response.status}: ${body.slice(0, 500)}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function directusAssetUrl(fileId: string | null | undefined): string | undefined {
  if (!fileId) {
    return undefined;
  }

  const config = getDirectusConfig();
  if (!config) {
    return undefined;
  }

  return `${config.url}/assets/${fileId}`;
}
