import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: 'Controlcognizant Bellevue College'//, scope: 'update:current_user_metadata'
        }
    })
});