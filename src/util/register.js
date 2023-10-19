export const register = (data, navigate, setUser, setError) => {
  if (!data) return;
  setUser({ ...data });
  if (data.loggedIn) {
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("username", data.username);
    navigate("/host");
  } else {
    setError(data.status);
  }
};
