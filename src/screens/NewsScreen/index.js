import React from "react";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import WebView from "../../components/WebView";

const NewsScreen = () => {
  return (
    <Background>
      {/* <TopBar title="ข่าวสาร" /> */}
      <WebView url="https://www.wu.ac.th/th/view/news" />
    </Background>
  );
};

export default NewsScreen;
