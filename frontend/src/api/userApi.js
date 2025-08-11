import { userApi } from "./api";

export const signup = async (userData) => {
  try {
    const response = await userApi.post("/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await userApi.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await userApi.post("/logout");
    return null;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await userApi.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Error during forgot password:", error);
    throw error;
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await userApi.post("/reset-password", resetData);
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await userApi.get("/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};
