import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { IconButton, useTheme, ToggleButton } from 'react-native-paper';
import { GestureResponderEvent } from 'react-native/types';
import Constants from "expo-constants";
const REACT_APP_SERVER_IP = Constants.expoConfig.extra.REACT_APP_SERVER_IP;
const REACT_APP_SERVER_PORT = Constants.expoConfig.extra.REACT_APP_SERVER_PORT;


type JoinProps = {
  id: string
};

const postUrl = `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}`;

const Joint = (props: JoinProps) => {
  const [value, setValue] = React.useState("5");
  const theme = useTheme();
  var longPress = false;
  // single click
  const turn = (direction: string) => {
    if (value) {
      fetch(`${postUrl}/joint/turn?joint=${props.id}&direction=${direction}&degree=${value}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(json => {
        console.log(`joint: ${props.id}, direction: ${direction}, degree: ${value}, res: ${json.res}`);
      });
    }
  }

  // long press
  const turning = (direction: string): void =>  {
    longPress = true;
    fetch(`${postUrl}/joint/run?joint=${props.id}&direction=${direction}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(json => {
      console.log(`run joint: ${props.id}, direction: ${direction}, res: ${json.res}`);
    });
  }

  const stopTurn = (event: GestureResponderEvent) => {
    if (longPress) {
      longPress = false;
      fetch(`${postUrl}/joint/stop?joint=${props.id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(json => {
        console.log(`joint: ${props.id}, long press end,  res: ${json.res}`);
      });
    }
  }

  return (
      <View style={[styles.viewobx, {backgroundColor: theme.colors.primaryContainer}]}>
        <View style={styles.button}>
          <IconButton
            icon='rotate-left'
            size={50}
            mode='outlined'
            onPress={() => turn("L")}
            onLongPress={() => turning("L")}
            onPressOut={stopTurn}
          />
        </View>
        <View style={styles.degree}>
          <Text style={{flex:1}}>degree</Text>
          <ToggleButton.Row onValueChange={value => setValue(value)} value={value} style={{flex:1}}>
            <ToggleButton icon="numeric-1" value="1" status={value === "1" ? "checked": "unchecked"}/>
            <ToggleButton icon="numeric-5" value="5" status={value === "5" ? "checked": "unchecked"}/>
            <ToggleButton icon="numeric-10" value="10" status={value === "10"? "checked": "unchecked"}/>
          </ToggleButton.Row>
        </View>
        <View style={styles.button}>
          <IconButton
            icon='rotate-right'
            size={50}
            mode='outlined'
            onPress={() => turn("R")}
            onLongPress={() => turning("R")}
            onPressOut={stopTurn}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  viewobx: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 5,
  },
  degree: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  }
});

export default Joint;