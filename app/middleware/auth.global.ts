import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {

    const { token, clearAuthTokens, info } = useAuthentication();
    const { $toast,$pinia } = useNuxtApp();
    const store =  useAuthStore($pinia);
    const ROLE_REDIRECTS: Record<Role, string> = {
        Admin: 'Dashboard',
        Employee: 'emp',
        TeamLead: 'team'
    };

    const GUEST_ROUTES = ['auth']


    const inf = JSON.parse(info.value);
    
    store.setUser(inf ?? []);

    if (!token.value) {
        if (to.name !== 'auth') {
            clearAuthTokens();
            return navigateTo({ name: "auth" });
        }
        return;
    }
    try {

        if (GUEST_ROUTES.some(route => route === to.name)) {
            return;
        }
        const role = inf.role as Role;
        const requiredRole = to.meta.requiredRole;

        if (role && requiredRole && role !== requiredRole) {
            $toast.error("You have no access on that page")
            return navigateTo({ name: ROLE_REDIRECTS[role] });

        }
    } catch (error) {
        clearAuthTokens();
        // return navigateTo({ name: "auth" });
    }
})
