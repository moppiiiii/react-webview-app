import styles from "./Header.ui.module.scss";
import githubIcon from '../../../assets/github-svgrepo-com.svg';

const Header: React.FC = () => {
  return (
    <header className={styles["header-container"]}>
      <p className={styles["header-text"]}>Weather App</p>
      <img
        loading="lazy"
        className={styles["github-icon"]}
        src={githubIcon}
        alt="github"
      />
    </header>
  );
};

Header.whyDidYouRender = true;
export default Header;
