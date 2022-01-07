import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
    url: 'https://sso.hsuan.app/auth',
    realm: 'Hsuan',
    clientId: 'YCHTalk',
});

export default keycloak;
