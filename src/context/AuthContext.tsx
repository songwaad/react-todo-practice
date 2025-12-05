import React, { useState, createContext, useEffect, useMemo, useCallback } from "react";
import { apiLogin, apiLogout, apiMe, type AuthUser } from "@/api/auth";

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController();

        const checkAuth = async () => {
            try {
                setLoading(true);
                const res = await apiMe(controller.signal);
                if (res.ok) {
                    setUser(res.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    console.error(`Auth check failed: ${error.message}`);
                    setUser(null);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        checkAuth();

        return () => {
            controller.abort();
        }
    }, []);

    const login = useCallback(async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
        const res = await apiLogin(username, password);

        if (!res.ok) {
            return { success: false, error: res.error };
        }

        setUser(res.data.user);
        return { success: true };
    }, []);

    const logout = useCallback(async (): Promise<void> => {
        await apiLogout();
        setUser(null);
    }, []);

    const value = useMemo<AuthContextType>(() => ({
        user,
        loading,
        login,
        logout,
        isAuthenticated: () => !!user,
    }), [user, loading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};