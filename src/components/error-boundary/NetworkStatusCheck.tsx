export const NetworkStatusCheck: React.FC = () => {
  if (!navigator.onLine) {
    console.log("オフライン状態を検出しました");
    throw new Error("Offline Error: The application is offline.");
  }

  return null; // UIは不要
};
