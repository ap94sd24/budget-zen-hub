export default {
  isAuthenticated() {
    // Your logic to determine if the user is authenticated
    // e.g., check for a valid token in local storage
    return !!localStorage.getItem('user.access');
  },
};
