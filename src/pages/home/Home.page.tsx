import HomeTemplate from "../../components/templates/home/Home.template";
import useForecast from "../../hooks/forecast";

const HomePage: React.FC = () => {
  const location = { latitude: 35.681236, longitude: 139.767125 };
  const { data } = useForecast(location);

  return <HomeTemplate listItem={data?.list ?? []} />;
};

HomePage.whyDidYouRender = true;
export default HomePage;
