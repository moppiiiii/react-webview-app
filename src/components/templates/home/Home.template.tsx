import BaseLayout from "../../layouts/Base.layout";
import styles from "./Home.template.module.scss";
import { HomeTemplateProps } from "./type";

const HomeTemplate: React.FC<HomeTemplateProps> = ({
  currentDate,
  currentTime,
  timeZoneClassification,
}) => {
  return (
    <BaseLayout timeZoneClassification={timeZoneClassification}>
      <div className={styles["home-container"]}>
        <p className={styles["current-date"]}>{currentDate}</p>
        <p className={styles["current-time"]}>{currentTime}</p>
      </div>
    </BaseLayout>
  );
};

HomeTemplate.whyDidYouRender = true;
export default HomeTemplate;
