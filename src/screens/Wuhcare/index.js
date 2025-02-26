import React from "react";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import WebView from "../../components/WebView";

const WuhcareScreen = () => {
  return (
    <Background>
      <TopBar title="WUH Care" />
      <WebView url="https://hospital.wu.ac.th/wuhcare/" />
    </Background>
  );
};

export default WuhcareScreen;
