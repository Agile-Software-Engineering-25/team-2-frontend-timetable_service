const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

type NotificationRequest = {
  title: string;
  message: string;
  notifyType: 'Mail' | 'UI' | 'All';
  notificationType: 'Info' | 'Warning' | 'Congratulation' | 'None';
  users?: string[];
  groups?: string[];
  shortDescription?: string;
  emailTemplate?: 'GENERIC';
  variables?: Record<string, unknown>;
};

export class NotificationServiceClient {
  private token: string | undefined;
  private tokenExpiry: number | undefined;

  constructor(private readonly baseURL: string) {}

  private async fetchToken(): Promise<string> {
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    const res = await fetch('/realms/sau/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: 'team-2',
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Token fetch failed: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    this.token = data.access_token;
    this.tokenExpiry = Date.now() + data.expires_in * 1000 - 5000; // 5s Sicherheitspuffer
    return this.token!;
  }

  private async headers(): Promise<Record<string, string>> {
    const token = await this.fetchToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  async post(path: string, body: NotificationRequest): Promise<void> {
    const res = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      headers: await this.headers(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `Notification POST ${path} failed: ${res.status} ${text}`
      );
    }

    const contentType = res.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      try {
        await res.json();
      } catch {
        // Ignorieren
      }
    }
  }
}
