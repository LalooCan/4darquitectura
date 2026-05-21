exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: 'Missing secret' }) };
  }

  try {
    const { token, remoteip } = JSON.parse(event.body);
    if (!token) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing token' }) };
    }

    const params = new URLSearchParams({ secret, response: token });
    if (remoteip) params.append('remoteip', remoteip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await res.json();
    console.log('[Turnstile]', JSON.stringify({ success: data.success, hostname: data.hostname, ts: new Date().toISOString() }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: data.success }),
    };
  } catch (err) {
    console.error('[Turnstile Error]', err.message);
    return { statusCode: 500, body: JSON.stringify({ success: false }) };
  }
};
