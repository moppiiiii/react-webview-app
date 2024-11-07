import ErrorLayout from "../../layouts/error-layout/Error.layout";
import styles from "./NotFound.template.module.scss";
const NotFoundTemplate: React.FC = () => {
  return (
    <ErrorLayout>
      <div className={styles["not-found-template-container"]}>
        <p className={styles["not-found-text"]}>404</p>
        <p className={styles["not-found-detail-text"]}>Not Found</p>
      </div>
    </ErrorLayout>
  );
};

NotFoundTemplate.whyDidYouRender = true;
export default NotFoundTemplate;
