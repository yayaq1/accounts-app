// Simple password-based authentication helper
// Uses sessionStorage to persist login state
// Note: Actual password validation happens server-side via API route

export const auth = {
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('admin_authenticated') === 'true';
  },

  login(password) {
    // Just store the auth state - password validation happens server-side
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('admin_authenticated', 'true');
    }
    return true;
  },

  logout() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_authenticated');
    }
  }
};

