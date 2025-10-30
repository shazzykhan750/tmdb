export const loadSession = () => {
  try {
    const session = localStorage.getItem("session");

    if (session) {
      const parsed = JSON.parse(session);

      return parsed;
    }

    return null;
  } catch (e) {
    console.warn("[sessionManager] Error loading session:", e);
    return null;
  }
};

export const saveSession = (userData) => {
  try {
    if (!userData) {
      console.error(
        "[sessionManager] Attempted to save null/undefined session data"
      );
      return;
    }

    const serialized = JSON.stringify(userData);
    localStorage.setItem("session", serialized);

    // Verify the save
    const saved = localStorage.getItem("session");
    if (saved === serialized) {
    } else {
      console.warn("[sessionManager] Session verification failed!");
    }
  } catch (e) {
    console.error("[sessionManager] Error saving session:", e);
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem("session");
    const verified = !localStorage.getItem("session");
    if (verified) {
      console.log("[sessionManager] Session cleared successfully");
    } else {
      console.warn("[sessionManager] Session clear verification failed!");
    }
  } catch (e) {
    console.error("[sessionManager] Error clearing session:", e);
  }
};
