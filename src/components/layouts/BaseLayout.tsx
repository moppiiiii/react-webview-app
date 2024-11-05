import Header from "../ui/header/Header.ui";
import { BaseLayoutProps } from "./type";

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

BaseLayout.whyDidYouRender = true;
export default BaseLayout;
