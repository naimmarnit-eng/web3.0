export const authConfig = {
pages: {
  signIn: "/login",
},

session: {
  strategy: "jwt" as const,
},

  providers: [],
};
