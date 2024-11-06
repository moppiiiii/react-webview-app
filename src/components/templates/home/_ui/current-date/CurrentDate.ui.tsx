import styles from "./CurrentDate.ui.module.scss";
import { CurrentDateProps } from "./type";

const CurrentDate: React.FC<CurrentDateProps> = ({
  currentDate,
  currentTime,
}) => {
  return (
    <div className={styles["current-date-wrapper"]}>
      <p className={styles["current-date"]}>{currentDate}</p>
      <p className={styles["current-time"]}>{currentTime}</p>
    </div>
  );
};

CurrentDate.whyDidYouRender = true;
export default CurrentDate;
