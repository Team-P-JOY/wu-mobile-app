import React from "react";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import WebView from "../../components/WebView";

const WebPortal = ({ navigation, route }) => {
  const { name, url } = route.params;
  return (
    <Background>
      <TopBar title={name} back={() => navigation.navigate("Dashboard")} />
      <WebView url={url} />
    </Background>
  );
};

export default WebPortal;
