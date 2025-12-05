import axios, { AxiosError } from "axios";

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

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
})


export async function apiMe(signal?: AbortSignal): Promise<ApiResponse<{ user: AuthUser }>> {
    try {
        const res = await api.get("/user", { signal });
        const user: AuthUser = res.data.data;
        
        if(!user) {
            return {
                ok: false,
                error: "No authenticated user found.",
            };
        }

        return {
            ok: true,
            data: { user,},
        }
        
    } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        const msg = err.response?.data?.message ?? `Failed to fetch user: ${err.response?.status ?? 'Network Error'}`;
        return {
            ok: false,
            error: msg,
        }
    }
}

export async function apiLogin(username: string, password: string): Promise<ApiResponse<{ user: AuthUser }>> {
    try {
        await api.post("/login", { username, password });
        return await apiMe();
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const msg = err.response?.data?.message ?? `Failed to login: ${err.response?.status ?? 'Network Error'}`;
        return {
            ok: false,
            error: msg,
        }
    }
}

export async function apiLogout(): Promise<ApiResponse<null>> {
    try {
        await api.post("/logout");
        return {
            ok: true,
            data: null,
        };
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const msg = err.response?.data?.message ?? `Failed to logout: ${err.response?.status ?? 'Network Error'}`;
        return {
            ok: false,
            error: msg,
        }
    }
}

export async function apiRegister(username: string, password: string): Promise<ApiResponse<null>> {
    try {
        await api.post("/users", { username, password });
        return {
            ok: true,
            data: null,
        };
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const msg = err.response?.data?.message ?? `Failed to register: ${err.response?.status ?? 'Network Error'}`;
        return {
            ok: false,
            error: msg,
        };
    }
}