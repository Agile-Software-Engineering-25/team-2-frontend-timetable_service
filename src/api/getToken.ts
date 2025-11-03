const clientSecret = import.meta.env.VITE_CLIENT_SECRET;



export class TokenService {
    private token: string | undefined;
    private tokenExpiry: number | undefined;

    constructor(private readonly baseURL: string) { }

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
        this.tokenExpiry = Date.now() + data.expires_in * 1000 - 5000;
        return this.token!;
    }

    public async getToken(): Promise<string> {
        return this.fetchToken();
    }


}