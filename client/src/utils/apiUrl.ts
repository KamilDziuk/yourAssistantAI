const API_URL = import.meta.env.VITE_API_URL;

// Builds an API address for the given client. Without a client slug the
// request goes to the default chat.
export function apiUrl(path: string, clientSlug?: string) {
  return clientSlug
    ? `${API_URL}c/${encodeURIComponent(clientSlug)}/${path}`
    : `${API_URL}${path}`;
}
