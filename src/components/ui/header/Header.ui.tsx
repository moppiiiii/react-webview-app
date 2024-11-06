import styles from "./Header.ui.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles["header-container"]}>
      <p className={styles["header-text"]}>Weather App</p>
      <img
        loading="lazy"
        className={styles["github-icon"]}
        src="src/assets/github-svgrepo-com.svg"
        alt="github"
      />
    </header>
  );
};

Header.whyDidYouRender = true;
export default Header;
