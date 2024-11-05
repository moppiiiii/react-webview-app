import BaseLayout from "../../layouts/BaseLayout";
import styles from "./Home.template.module.scss";
import { HomeTemplateProps } from "./type";

const HomeTemplate: React.FC<HomeTemplateProps> = ({ listItem }) => {
  return (
    <BaseLayout>
    <div className={styles["home-container"]}>
    {listItem.map((item) => {
        return <p key={item.dt} >{item.dt_txt}</p>;
    })}
    </div>

      
    </BaseLayout>
  );
};

HomeTemplate.whyDidYouRender = true;
export default HomeTemplate;
