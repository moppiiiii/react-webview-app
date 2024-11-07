import styles from "./Header.ui.module.scss";
import githubIcon from "../../../assets/icons/github-svgrepo-com.svg";

const Header: React.FC = () => {
  return (
    <header className={styles["header-container"]}>
      <a href="/" title="Top Page">
        <p className={styles["header-text"]}>Weather App</p>
      </a>
      <a
        href="https://github.com/moppiiiii/react-webview-app"
        title="Github Repository"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          loading="lazy"
          className={styles["github-icon"]}
          src={githubIcon}
          alt="github"
        />
      </a>
    </header>
  );
};

Header.whyDidYouRender = true;
export default Header;
