export async function validateToken(token: string) {
  const res = await fetch('/api/auth/verify', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { Authorization: `Bearer ${token}` },
    redirect: 'follow',
    referrer: 'no-referrer',
  });

  return await res.json();
}
