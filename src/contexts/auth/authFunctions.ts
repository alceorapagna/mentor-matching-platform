
// Import the login and logout functions from their respective files
import { login, logout, testAccess } from './loginFunctions';
import { register } from './registerFunctions';

// Re-export all auth functions
export { login, logout, testAccess, register };
