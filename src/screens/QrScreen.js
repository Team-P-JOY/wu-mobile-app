import React from "react";
import Background from "../components/Background";
import TopBar from "../components/TopBar";
import WebView from "../components/WebView";

const QrScreen = () => {
  return (
    <Background>
      <TopBar title="" />
      <WebView url="https://hrms.wu.ac.th/index.php?r=tal-time-log%2Fcheckingps_v2" />
    </Background>
  );
};

export default QrScreen;
