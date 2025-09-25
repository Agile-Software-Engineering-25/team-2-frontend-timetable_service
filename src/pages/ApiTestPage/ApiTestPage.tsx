import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card } from '@agile-software/shared-components/src';
import { Box, Typography, Textarea } from '@mui/joy';

type Jsonish = unknown;

const ApiTestPage = () => {
  const tokenRef = useRef<string | null>(null);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  // Token holen & cachen (nur Console-Log)
  async function ensureToken() {
    const r = await fetch('/api/v1/login');
    if (!r.ok)
      throw new Error(`Login fehlgeschlagen: ${r.status} ${r.statusText}`);
    const t = await r.text();
    tokenRef.current = t;
    console.log('[ApiTestPage] JWT Token:', t);
    return t;
  }

  // Helper: Request ausführen und Ausgabe setzen
  async function run(label: string, path: string) {
    setLoading(label);
    setError(null);
    try {
      const token = tokenRef.current ?? (await ensureToken());
      const r = await fetch(path, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) throw new Error(`${label}: ${r.status} ${r.statusText}`);

      let body = '';
      try {
        const json = (await r.clone().json()) as Jsonish;
        body = JSON.stringify(json, null, 2);
      } catch {
        body = await r.text();
      }
      setOutput(body || '(leer)');
    } catch (e: any) {
      setOutput(''); // bei Fehler Ausgabe leeren
      setError(e?.message ?? String(e));
      console.error('[ApiTestPage] Fehler:', e);
    } finally {
      setLoading(null);
    }
  }

  // Beim ersten Laden Token holen
  useEffect(() => {
    ensureToken().catch((e) => {
      setError(e?.message ?? String(e));
    });
  }, []);

  const endpoints = useMemo(
    () => [
      { label: 'GET /schedule', path: '/api/v1/schedule' },
      { label: 'GET /schedule/personal', path: '/api/v1/schedule/personal' },
      { label: 'GET /schedule/all', path: '/api/v1/schedule/all' },
      { label: 'GET /schedule/conflicts', path: '/api/v1/schedule/conflicts' },
      { label: 'GET /schedule/types', path: '/api/v1/schedule/types' },
    ],
    []
  );

  return (
    <Box sx={{ p: 2, maxWidth: 1100, mx: 'auto' }}>
      <Typography level="h4" gutterBottom>
        API Test Page
      </Typography>

      {/* Button-Leiste */}
      <Card>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 12, rowGap: 12 }}>
          {endpoints.map((e) => (
            <Button
              key={e.label}
              onClick={() => run(e.label, e.path)}
              disabled={loading !== null}
            >
              {e.label}
            </Button>
          ))}
        </Box>
      </Card>

      {/* Fehleranzeige */}
      {error && (
        <Card>
          <Typography color="danger">Fehler: {error}</Typography>
        </Card>
      )}

      {/* Response-Ausgabe */}
      <Card>
        <Textarea
          minRows={14}
          readOnly
          value={output}
          sx={{
            mt: 1,
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            whiteSpace: 'pre',
          }}
        />
      </Card>
    </Box>
  );
};

export default ApiTestPage;
