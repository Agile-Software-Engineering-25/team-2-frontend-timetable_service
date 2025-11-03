import useUser from '../../hooks/useUser';

export class TokenService {

    private async fetchToken(): Promise<string> {
        const user = useUser();
        const token = user.getAccessToken();
        return token;
    }

    public async getToken(): Promise<string> {
        return this.fetchToken();
    }


}