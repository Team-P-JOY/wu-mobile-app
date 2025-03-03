import React, { useState, useEffect, useContext } from "react";
import { View } from 'react-native'
import Background from '../../components/Background'
import TopBar from "../../components/TopBar";
import { AuthContext } from "../../context/AuthContext";
import { FAB, Portal, PaperProvider, Card, Text } from 'react-native-paper';
import MenuContent from "./MenuContent";

const Leave = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Background>
        {/* Header session */}
        <TopBar 
            title="บันทึกการลา" 
            // right={() => navigation.navigate("Main")} 
            // rightIcon="menu" 
        />

        {/* Menu */}
        <MenuContent navigation={navigation} />

        <View>
            <Text style={{margin: "auto", padding: 20}}>กำลังปรับปรุง...</Text>
        </View>
        <PaperProvider>
            <Portal>
                <FAB.Group
                open={open}
                visible
                icon={open ? 'close' : 'plus'}
                actions={[
                    {
                    icon: 'shape-square-rounded-plus',
                    label: 'สร้างใบลา',
                    onPress: () => console.log('Pressed notifications'),
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                    // do something if the speed dial is open
                    }
                }}
                />
            </Portal>
        </PaperProvider>
    </Background>
  )
}

export default Leave