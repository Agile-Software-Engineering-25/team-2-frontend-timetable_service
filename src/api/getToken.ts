export function getToken() {
    const storedUser = localStorage.getItem("oidc.user:https://keycloak.sau-portal.de/realms/sau:root-ui");
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            return parsedUser.access_token
        } catch (error) {
            console.error("Fehler beim Parsen von localStorage:", error);
        }
    }
}