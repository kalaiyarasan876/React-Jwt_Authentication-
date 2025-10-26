import API from "../../api/axios";
//console.log("api", API.defaults?.baseURL);

const register = async (userData) => {
    const res = await API.post("/register", userData);
    if (res?.data?.token) {
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
    }
    return res.data;
};

const login = async (userData) => {
    const res = await API.post("/login", userData);
    //  console.log("login_res" , res);
    //  console.log("token" , res?.data?.token);
    if (res?.data?.token) {
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
    }
    return res.data;
}

const logout = async () => {
    await API.post("/logout",);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

const getUser = async () => {
    const token = localStorage.getItem("token");
  //  console.log("token->", token);
    
    if (!token) throw new Error("No Token Found");
    const res = await API.get("/me", {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data;
}

const authService = { register, login, logout, getUser };

export default authService;