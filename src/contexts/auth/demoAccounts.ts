
import { User, UserRole, CompassData } from './types';

// Sample compass data for demo accounts
export const sampleCompassData: CompassData = {
  purpose: "To achieve balance and growth in my professional and personal life.",
  coreValues: ["Wellbeing", "Growth", "Balance", "Authenticity", "Connection"],
  dimensions: {
    work: { 
      currentState: 6, 
      desiredState: 9, 
      goals: ["Advance career while maintaining balance"],
      current: 6,           // For compatibility
      desired: 9,           // For compatibility
      notes: "Looking to advance my career while maintaining balance."
    },
    mind: { 
      currentState: 5, 
      desiredState: 8, 
      goals: ["Reduce stress", "Improve mental clarity"],
      current: 5,           // For compatibility
      desired: 8,           // For compatibility
      notes: "Working on reducing stress and improving mental clarity."
    },
    body: { 
      currentState: 4, 
      desiredState: 7, 
      goals: ["Establish exercise routine", "Improve sleep habits"],
      current: 4,           // For compatibility
      desired: 7,           // For compatibility
      notes: "Need to establish consistent exercise routines and better sleep habits."
    }
  }
};

// Create a demo user based on role
export const createDemoUser = (email: string, role: UserRole): User => {
  return {
    id: `demo-${role}-${Date.now()}`,
    email: email,
    firstName: 'Demo',
    lastName: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize first letter
    role: role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Demo${role}`,
    compassCompleted: true, // Demo accounts have completed the compass
    compassData: role === 'client' ? sampleCompassData : undefined, // Add compass data for client users
  };
};

// Create a test user based on role
export const createTestUser = (role: UserRole): User => {
  return {
    id: `test_${role}_${Date.now()}`,
    email: `${role}@test.com`,
    firstName: 'Test',
    lastName: role.charAt(0).toUpperCase() + role.slice(1),
    role: role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Test${role}`,
    compassCompleted: true, // Test users have completed the compass
    compassData: role === 'client' ? sampleCompassData : undefined, // Add compass data for client test users
  };
};

// Check if an email is a demo account
export const isDemoAccount = (email: string): boolean => {
  return email.includes('@example.com');
};
