import { AuthProvider } from "@refinedev/core";
import { Amplify } from "aws-amplify";
import { signIn, signOut, fetchAuthSession, getCurrentUser, resetPassword, confirmResetPassword } from "aws-amplify/auth";
import type { AuthActionResponse } from "@refinedev/core/";

const userPoolId = import.meta.env.VITE_USERPOOL_ID;
const userPoolClientId = import.meta.env.VITE_USERPOOL_WEB_CLIENT_ID;
const region = import.meta.env.VITE_AWS_REGION;

Amplify.configure({
Auth: {
    Cognito: {
    userPoolId: userPoolId,
    userPoolClientId: userPoolClientId,
    },
},
});


const getErrorResponse = (error: unknown): AuthActionResponse => {
  if (error instanceof Error) {
    return {
      success: false,
      error: error,
    };
  }
  if (typeof error === "string") {
    return {
      success: false,
      error: new Error(error),
    };
  } else {
    return {
      success: false,
      error: new Error("Unknown error"),
    };
  }
};

export const authProvider: AuthProvider = {
  login: async (input) => {
    const { email, password } = input;
    try {
      console.log("Attempting login with:", { email, password: "***" });
      const user = await signIn({ username: email, password });
      console.info("login success", user);
      
      // Check if login requires additional steps
      if (user.isSignedIn) {
        console.log("User is fully signed in");
        return {
          success: true,
          redirectTo: "/",
        };
      } else {
        console.log("Login requires additional steps:", user.nextStep);
        
        // Handle different next steps
        if (user.nextStep.signInStep === "CONFIRM_SIGN_UP") {
          return {
            success: false,
            error: new Error("Please verify your email address before signing in"),
          };
        } else if (user.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
          // Store the session for password confirmation
          console.log("Password change required. Session stored for confirmation.");
          return {
            success: false,
            error: new Error("NEW_PASSWORD_REQUIRED"),
            redirectTo: "/change-password",
          };
        } else {
          return {
            success: false,
            error: new Error(`Additional authentication required: ${user.nextStep.signInStep}`),
          };
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      return getErrorResponse(error);
    }
  },
  logout: async () => {
    try {
      console.log("Attempting logout...");
      await signOut();
      console.log("Logout successful");
      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error) {
      console.error("Logout error:", error);
      return getErrorResponse(error);
    }
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error: new Error("Unauthorized"),
      };
    }
    return {};
  },
  check: async () => {
    try {
      console.log("Checking authentication...");
      const session = await fetchAuthSession();
      console.log("Auth session:", session);
      
      // Check if we have valid tokens
      if (session.tokens && session.tokens.idToken && session.tokens.idToken.toString()) {
        console.log("User is authenticated with valid tokens");
        return {
          authenticated: true,
        };
      } else {
        console.log("No valid tokens found, user is not authenticated - redirecting to login");
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
    } catch (error) {
      console.log("Authentication check failed:", error);
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },
  getPermissions: async () => {
    try {
      const user = await getCurrentUser();
      // fixme: implement your own logic
      // const permissions = (user.attributes["custom:permissions"] ?? "").split(",");
      // return permissions;
      return [];
    } catch (error) {
      return [];
    }
  },
  getIdentity: async () => {
    try {
      const user = await getCurrentUser();
      return {
        id: user.username,
        fullName: user.signInDetails?.loginId || user.username,
        avatar: undefined,
      };
    } catch (error) {
      return null;
    }
  },
  forgotPassword: async (input) => {
    try {
      await resetPassword({ username: input.email });
      return {
        success: true,
        redirectTo: "/update-password",
      };
    } catch (error) {
      return getErrorResponse(error);
    }
  },
  updatePassword: async (input) => {
    try {
      await confirmResetPassword({ username: input.email, confirmationCode: input.code, newPassword: input.password });
      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error) {
      return getErrorResponse(error);
    }
  },
};
