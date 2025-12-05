export interface AuthUser {
    user_id: string;
    username: string;
}

interface ApiOk<T> {
    ok: true;
    data: T;
}

interface ApiError {
    ok: false;
    error: string;
}

export type ApiResponse<T> = ApiOk<T> | ApiError;

const BASE_URL = "http://localhost:8080/api";

export async function apiMe(signal?: AbortSignal): Promise<ApiResponse<{ user: AuthUser }>> {
    const res = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
        signal,
    });
    const data = await res.json();
    
    if(!res.ok) {
        const msg = data?.message ?? `Failed to fetch /user: ${res.status}`;
        return {
            ok: false,
            error: msg,
        };
    }

    const user: AuthUser | undefined = data?.data;
    
    if(!user) {
        return {
            ok: false,
            error: `No user data found in response.`,
        };
    }

    return {
        ok: true,
        data: {
            user,
        },
    }
}

export async function apiLogin(username: string, password: string): Promise<ApiResponse<{ user: AuthUser }>> {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        const msg = data?.message ?? `Failed to login: ${res.status}`;
        return {
            ok: false,
            error: msg,
        };
    }

    return await apiMe();
        
}

export async function apiLogout(): Promise<ApiResponse<null>> {
    const res = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
        const msg = data?.message ?? `Failed to logout: ${res.status}`;
        return {
            ok: false,
            error: msg,
        };
    }

    return {
        ok: true,
        data: null,
    };
}

export async function apiRegister(username: string, password: string): Promise<ApiResponse<null>> {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
        const msg = data?.message ?? `Failed to register: ${res.status}`;
        return {
            ok: false,
            error: msg,
        };
    }
    return {
        ok: true,
        data: null,
    };
}