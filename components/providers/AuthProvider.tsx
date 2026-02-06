'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, logout as apiLogout, UserMeResponse, AuthResponse } from '@/lib/api';

interface User {
    id: string;
    displayName: string;
    telegramUsername?: string;
    username?: string;
    isVerified: boolean;
    avatarUrl?: string;
    phone?: string;
    isAdmin: boolean;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        try {
            setIsLoading(true);

            // Check if we have a token before making the request
            const hasToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');
            if (!hasToken) {
                setUser(null);
                setIsLoading(false);
                return;
            }

            const response = await getCurrentUser();

            // Check if response indicates user is not authenticated
            if (!response.success || !response.data) {
                setUser(null);
                return;
            }

            setUser({
                id: response.data.id,
                displayName: response.data.displayName,
                telegramUsername: response.data.username,
                username: response.data.username,
                isVerified: response.data.isVerified,
                avatarUrl: response.data.avatarUrl,
                phone: response.data.phone,
                isAdmin: response.data.isAdmin,
            });
        } catch (error) {
            // Not authenticated or error - that's ok
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await apiLogout();
            setUser(null);
            // Redirect to home
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const refetch = async () => {
        await fetchUser();
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refetch,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
