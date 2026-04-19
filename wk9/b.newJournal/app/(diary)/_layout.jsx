import { Slot } from 'expo-router';

/** 此群組僅 index 一個畫面：用 Slot 即可，勿再包一層 Stack（與根 Stack 重疊） */
export default function DiaryLayout() {
  return <Slot />;
}
