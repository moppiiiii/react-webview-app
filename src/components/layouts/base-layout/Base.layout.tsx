import Header from "../../ui/header/Header.ui";
import styles from "./Base.layout.module.scss";
import { BaseLayoutProps } from "./type";

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  timeZoneClassification,
}) => {
  return (
    <div
      className={`${styles["base-layout-container"]} ${styles[`base-${timeZoneClassification}-background`]}`}
    >
      <Header />
      <div>{children}</div>
    </div>
  );
};

BaseLayout.whyDidYouRender = true;
export default BaseLayout;
