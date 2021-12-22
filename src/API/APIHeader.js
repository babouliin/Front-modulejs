export const headers = {
  'Content-Type': 'application/json',
  'Accept-Language': 'en',
};

export function updateHeadersToken(token) {
  headers.Authorization = `Bearer ${token}`;
}

export default function updateHeaders(lang) {
  headers['Accept-Language'] = lang;
}
