exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const report = body['csp-report'] || body;

    console.warn('[CSP Violation]', JSON.stringify({
      ts:           new Date().toISOString(),
      blocked:      report['blocked-uri']      || report.blockedURL,
      directive:    report['violated-directive'] || report.effectiveDirective,
      document:     report['document-uri']     || report.documentURL,
      referrer:     report['referrer']         || '',
      source:       report['source-file']      || '',
      line:         report['line-number']      || '',
      userAgent:    event.headers['user-agent'] || '',
    }));

    return { statusCode: 204, body: '' };
  } catch (err) {
    console.error('[CSP Report Error]', err.message);
    return { statusCode: 400, body: 'Bad Request' };
  }
};
