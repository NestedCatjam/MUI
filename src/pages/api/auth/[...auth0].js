import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
    login: handleLogin({
        authorizationParams: {audience: 'Controlcognizant Bellevue College', scope: 'openid read:account openid profile email add:users delete:users' }
    })
});