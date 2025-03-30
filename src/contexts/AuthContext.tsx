
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: { first_name: string, last_name: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Record<string, any>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // On sign-in, redirect to home
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setTimeout(() => {
            const returnUrl = sessionStorage.getItem('returnUrl') || '/';
            sessionStorage.removeItem('returnUrl');
            navigate(returnUrl);
          }, 0);
        } 
        // On sign-out, redirect to login
        else if (event === 'SIGNED_OUT') {
          setTimeout(() => {
            navigate('/login');
          }, 0);
        }
        
        // On user update, refresh the user data
        else if (event === 'USER_UPDATED') {
          setUser(currentSession?.user ?? null);
          toast({
            title: "Profile updated",
            description: "Your profile has been updated successfully",
          });
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleAuthError = (error: AuthError, fallbackMessage: string) => {
    let description = error.message;
    
    // Handle specific error codes with more user-friendly messages
    switch (error.message) {
      case 'Invalid login credentials':
        description = 'The email or password you entered is incorrect. Please try again.';
        break;
      case 'Email not confirmed':
        description = 'Please confirm your email address before signing in.';
        break;
      case 'User already registered':
        description = 'An account with this email already exists. Try signing in instead.';
        break;
      case 'provider is not enabled':
        description = 'Google login is not properly configured. Please check your Supabase project settings.';
        break;
      default:
        description = error.message || fallbackMessage;
    }
    
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: description,
    });
    
    throw error;
  };

  const signUp = async (email: string, password: string, metadata: { first_name: string, last_name: string }) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Please check your email for verification instructions.",
      });
      
    } catch (error: any) {
      handleAuthError(error, "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "Welcome back to MomCare!",
      });
      
    } catch (error: any) {
      handleAuthError(error, "Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Store current URL to redirect back after auth
      sessionStorage.setItem('returnUrl', window.location.pathname !== '/login' && window.location.pathname !== '/signup' 
        ? window.location.pathname 
        : '/');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/tracking`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Redirecting to Google",
        description: "Please complete the authentication process"
      });
      
    } catch (error: any) {
      console.error("Google login error:", error);
      handleAuthError(error, "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for instructions.",
      });
      
    } catch (error: any) {
      handleAuthError(error, "An error occurred. Please try again.");
    }
  };

  const updateProfile = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: data
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "An error occurred while updating your profile.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    signInWithGoogle
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
