import Header from "../../ui/header/Header.ui";
import { ErrorLayoutProps } from "./type";
import styles from "./Error.layout.module.scss";
const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <div className={styles["error-layout-container"]}>
      <Header />
      {children}
    </div>
  );
};

ErrorLayout.whyDidYouRender = true;
export default ErrorLayout;
