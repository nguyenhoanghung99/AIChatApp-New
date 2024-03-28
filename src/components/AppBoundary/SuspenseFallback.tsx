import { AppView } from "@/components";
import { ActivityIndicator } from "react-native";

export function SuspenseFallback() {
  return (
    <AppView justifyContent="center" alignItems="center">
      <ActivityIndicator size={50} />
    </AppView>
  );
}
