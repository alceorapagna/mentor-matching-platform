
import { User, CompassData } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { NavigateFunction } from 'react-router-dom';

// Function to update user's compass completion status
export const updateCompassStatus = async (
  user: User | null, 
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  completed: boolean
) => {
  if (!user) return;
  
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ compass_completed: completed })
      .eq('id', user.id);
      
    if (error) {
      console.error('Error updating compass status:', error);
      toast.error('Failed to update your progress');
      return;
    }
    
    // Update local user state
    setUser({
      ...user,
      compassCompleted: completed
    });
    
    toast.success('Progress saved successfully');
  } catch (error) {
    console.error('Error in updateCompassStatus:', error);
    toast.error('An error occurred while saving your progress');
  }
};

// Function to update user's compass data
export const updateCompassData = async (
  user: User | null, 
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  compassData: CompassData
) => {
  if (!user) return;
  
  try {
    console.log("Saving compass data to Supabase:", compassData);
    
    // Save compass data to the user profile in Supabase
    const { error } = await supabase
      .from('profiles')
      .update({
        compass_data: compassData
      })
      .eq('id', user.id);
      
    if (error) {
      console.error('Error updating compass data:', error);
      toast.error('Failed to save your compass data');
      throw error;
    }
    
    // Update local user state
    setUser({
      ...user,
      compassData
    });
    
    console.log("Compass data saved successfully:", compassData);
    toast.success('Your compass data has been saved');
  } catch (error) {
    console.error("Error updating compass data:", error);
    toast.error('An error occurred while saving your compass data');
    throw error;
  }
};

// Function to reset user's compass data (for testing purposes)
export const resetCompassData = async (
  user: User | null, 
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  if (!user) return;
  
  try {
    setIsLoading(true);
    console.log("Resetting compass data for user:", user.id);
    
    const { error } = await supabase
      .from('profiles')
      .update({ 
        compass_completed: false,
        compass_data: null
      })
      .eq('id', user.id);
      
    if (error) {
      console.error('Error resetting compass data:', error);
      toast.error('Failed to reset your onboarding data');
      return;
    }
    
    // Update local user state
    setUser({
      ...user,
      compassCompleted: false,
      compassData: undefined
    });
    
    toast.success('Onboarding data reset successfully');
    navigate('/reneu-compass');
  } catch (error) {
    console.error('Error in resetCompassData:', error);
    toast.error('An error occurred while resetting your data');
  } finally {
    setIsLoading(false);
  }
};
