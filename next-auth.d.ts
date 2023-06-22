import NextAuth, { DefaultSession, User } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & User;
  }

  interface User {
    // Add any additional properties you need for the user object
  }

  interface Callbacks {
    signIn(user: User, account: Account, profile: any): Promise<boolean>;
    // Add other callback functions if needed
  }
}

const options = {
  // NextAuth.js configuration options
  // ...
  callbacks: {
    async signIn(user, account, profile) {
      // Check if the user's GitHub username is whitelisted
      //const whitelistedUsernames = ['seichris', 'username2', 'username3'];
      const whitelistedUsernames = ['seichris'];
      const { username } = profile;
      if (!whitelistedUsernames.includes(username)) {
        return Promise.reject(false); // Prevent sign-in for non-whitelisted users
      }
      
      return Promise.resolve(true); // Allow sign-in for whitelisted users

    },
    // Add other callback functions if needed
  },
};

export default NextAuth(options);
