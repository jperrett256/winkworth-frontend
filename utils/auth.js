export const Auth = {
    authenticated: false,
    data: null,
    getData: function () {
        const match = document.cookie.match(/(^| )token_data=([^;]+)/);

        if (match) {
            const payload = atob(match[2].split('.')[1]);
            this.data = JSON.parse(payload);
            this.authenticated = true;
        } else {
            this.revoke();
        }
    },
    revoke: function () {
        document.cookie = 'token_data=';
        this.authenticated = false;
        this.data = null;
    }
};