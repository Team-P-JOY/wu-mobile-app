import React, { memo, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import BackgroundImage from "../components/BackgroundImage";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { dataValidator } from "../core/utils";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });
  const [loading, setLoading] = useState(false);

  const _onLoginPressed = async () => {
    const userError = dataValidator(username.value, "Username ");
    const passwordError = dataValidator(password.value, "Password ");
    if (userError || passwordError) {
      setUsername({ ...username, error: userError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    const loginError = await login(username.value, password.value);
    if (loginError) {
      setUsername({ ...username, error: loginError });
    }
    setLoading(false);
  };

  return (
    <BackgroundImage>
      <View
        style={{
          flex: 1,
          padding: 5,
          width: "100%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo />
        <Header>Welcome</Header>
        <TextInput
          label="Username"
          returnKeyType="next"
          value={username.value}
          onChangeText={(text) => setUsername({ value: text, error: "" })}
          error={!!username.error}
          errorText={username.error}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator animating={true} size="large" />
        ) : (
          <Button mode="contained" onPress={_onLoginPressed}>
            เข้าสู่ระบบ
          </Button>
        )}
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
