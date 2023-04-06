import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
const UserContextProvider = (props) => {
  const router = useRouter();
  const [user, setUser] = useState({ token: "" });
  const [userInfo, setUserInfo] = useState({
    address: "",
    phone: "",
    pinCode: "",
    name: "",
    email: "",
    orderId: JSON.stringify(Date.now()),
    city: "",
    state: "",
    paymentInfo: "",
  });
  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    setUser({ token: authToken });
    if (authToken) {
      const userInfoFetch = async () => {
        const req = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ authToken }),
        });
        const fet = await req.json();
        setUserInfo({
          ...userInfo,
          address: fet.user.address,
          email: fet.user.email,
          phone: fet.user.phone,
          pinCode: fet.user.pincode,
          name: fet.user.name,
          city: fet.city,
          state: fet.state,
        });
      };
      userInfoFetch();
    } else {
      setUserInfo({
        ...userInfo,
        address: "",
        email: "",
        phone: "",
        pinCode: "",
        name: "",
        city: "",
        state: "",
      });
    }
  }, [user.token]);
  const logout = () => {
    localStorage.removeItem("auth-token");
    router.push("/");
    setUser({});
    setUserInfo({});
  };

  return (
    <UserContext.Provider
      value={{ user, userInfo, setUser, setUserInfo, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
