import { Pressable, Text, View } from "react-native";
import { styles } from "../quiz/styles";

type DevMenuProps = {
  showDevMenu: boolean;
  onToggle: () => void;
  onReset: () => void;
  onUnlockNext: () => void;
  onUnlockAll: () => void;
};

export default function DevMenu({
  showDevMenu,
  onToggle,
  onReset,
  onUnlockNext,
  onUnlockAll,
}: DevMenuProps) {
  if (!__DEV__) return null;

  return (
    <View style={styles.devPanel}>
      <Pressable onPress={onToggle} style={styles.devResetBtn}>
        <Text style={styles.devResetText}>
          {showDevMenu ? "HIDE DEV MENU" : "SHOW DEV MENU"}
        </Text>
      </Pressable>

      {showDevMenu ? (
        <>
          <Pressable onPress={onReset} style={styles.devResetBtn}>
            <Text style={styles.devResetText}>RESET ALL DATA (DEV)</Text>
          </Pressable>

          <Pressable onPress={onUnlockNext} style={styles.devResetBtn}>
            <Text style={styles.devResetText}>DEV: SET NEXT LOCKED TO 100%</Text>
          </Pressable>

          <Pressable onPress={onUnlockAll} style={styles.devResetBtn}>
            <Text style={styles.devResetText}>DEV: UNLOCK ALL LEVELS</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}