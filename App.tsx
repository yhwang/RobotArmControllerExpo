import React from 'react';
import { StatusBar } from 'expo-status-bar';
import type {PropsWithChildren} from 'react';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Joint from './lib/joint';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.colors.primary,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const theme = useTheme();

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <StatusBar
        style="auto"
        backgroundColor={theme.colors.background}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: theme.colors.background}}>
        <View
          style={{
            backgroundColor: theme.colors.background,
          }}>
          <Section title="Robot Arm Controller"/>
          <Section title="Joint 1"/>
          <Joint id="1" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});
