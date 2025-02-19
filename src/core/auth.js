import AsyncStorage from "@react-native-async-storage/async-storage";

const userStore = "@user";
const pinStore = "@userPin";
const darkStore = "@isDarkMode";

const getDarkMode = async () => {
  const isDark = await AsyncStorage.getItem(darkStore);
  return isDark === "true";
};
const setDarkMode = async (isDark) => {
  await AsyncStorage.setItem(darkStore, isDark);
};

const savePin = async (pin) => {
  await AsyncStorage.setItem(pinStore, pin);
};

const getPin = async () => {
  return await AsyncStorage.getItem(pinStore);
};

const removePin = async () => {
  await AsyncStorage.removeItem(pinStore);
};

const getUser = async () => {
  const user = await AsyncStorage.getItem(userStore);
  return user ? JSON.parse(user) : null;
};

const login = async (username, password) => {
  const respone = await fetch("https://hrms.wu.ac.th/index.php?r=api/auth", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userAuth = await respone.json();
  if (userAuth.status === "error") {
    return userAuth.message;
  }
  // const userAuth = {
  //   data: {
  //     id: 1,
  //     username: "hakim.mu",
  //     email: "",
  //   },
  // };
  await AsyncStorage.setItem(userStore, JSON.stringify(userAuth.data));
  return "";
};

const logout = async () => {
  await AsyncStorage.removeItem(userStore);
  await AsyncStorage.removeItem(pinStore);
};

const checkAuth = async () => {
  const user = await AsyncStorage.getItem(userStore);
  const pin = await AsyncStorage.getItem(pinStore);
  return {
    user: user ? JSON.parse(user) : null,
    pin: pin ? pin : null,
  };
};

export default {
  savePin,
  getPin,
  removePin,
  login,
  logout,
  getUser,
  checkAuth,
  getDarkMode,
  setDarkMode,
};
