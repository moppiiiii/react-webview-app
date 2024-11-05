import styles from "./Header.ui.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles["header-container"]}>
      <p className={styles["header-text"]}>Weather App</p>
    </header>
  );
};

Header.whyDidYouRender = true;
export default Header;
