
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from '../types';
import { useToast } from '@/hooks/use-toast';
import { fetchUserProfile } from '../utils';
import { isDemoAccount } from '../demoAccounts';

export const useAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session on first load
  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          setUser(null);
        } else if (data.session) {
          // Get the user profile from the database
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          if (userError) {
            console.error('Error fetching user profile:', userError);
            setUser(null);
          } else if (userData) {
            // Convert table column names to our User type property names
            setUser({
              id: userData.id,
              email: userData.email,
              firstName: userData.first_name,
              lastName: userData.last_name,
              role: userData.role as UserRole,
              avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.first_name}`,
              compassCompleted: userData.compass_completed || false,
              compassData: userData.compass_data as any,
              hasReneuCoach: userData.hasreneucoach || false,
              hasBusinessCoach: userData.hasbusinesscoach || false,
              hasMindCoach: userData.hasmindcoach || false,
              hasBodyCoach: userData.hasbodycoach || false
            });
          }
        }
      } catch (error) {
        console.error('Error in session check:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    getSession();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Get the user profile from the database
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (userError) {
          console.error('Error fetching user profile:', userError);
          setUser(null);
        } else if (userData) {
          setUser({
            id: userData.id,
            email: userData.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
            role: userData.role as UserRole,
            avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.first_name}`,
            compassCompleted: userData.compass_completed || false,
            compassData: userData.compass_data as any,
            hasReneuCoach: userData.hasreneucoach || false,
            hasBusinessCoach: userData.hasbusinesscoach || false,
            hasMindCoach: userData.hasmindcoach || false,
            hasBodyCoach: userData.hasbodycoach || false
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    navigate,
    toast
  };
};
