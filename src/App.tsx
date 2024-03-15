import { Panel, Root, View } from "@vkontakte/vkui";
import {} from "@vkontakte/icons";
import "@vkontakte/vkui/dist/vkui.css";

import { Cart } from "./components/cart/Cart";
import styles from "./App.module.css";

export function App() {
  return (
    <Root activeView="main">
      <View id="main" activePanel="panel">
        <Panel id="panel" className={styles.Panel}>
          <Cart />
        </Panel>
      </View>
    </Root>
  );
}
