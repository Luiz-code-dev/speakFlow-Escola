import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { default: WebView } = require("react-native-webview") as {
  default: React.ComponentType<Record<string, unknown>>;
};

SplashScreen.preventAutoHideAsync();

const ESCOLA_URL = "https://speakflow.ia.br/escola/inicio";
const INDIGO = "#4F46E5";

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const webviewRef = useRef<any>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Platform.isTV) {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        if (canGoBack && webviewRef.current) {
          webviewRef.current.goBack();
          return true;
        }
        return false;
      });
      return () => sub.remove();
    }
  }, [canGoBack]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleNavChange(state: any) {
    setCanGoBack(state.canGoBack ?? false);
  }

  async function handleLoadEnd() {
    setLoading(false);
    await SplashScreen.hideAsync();
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" backgroundColor={INDIGO} translucent={false} />

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={INDIGO} />
        </View>
      )}

      <WebView
        ref={webviewRef}
        source={{ uri: ESCOLA_URL }}
        style={styles.webview}
        onNavigationStateChange={handleNavChange}
        onLoadEnd={handleLoadEnd}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={true}
        allowsBackForwardNavigationGestures={true}
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="compatibility"
        userAgent="SpeakFlowEscolasApp/1.0 Android"
        startInLoadingState={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: INDIGO,
  },
  webview: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    zIndex: 10,
  },
});
