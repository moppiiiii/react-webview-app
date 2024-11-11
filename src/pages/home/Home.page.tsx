import { useEffect, useState } from "react";
import {
  clearForecasts,
  fetchForecast,
} from "../../libs/indexed-db/forecast";
import { ForecastResponse } from "../../hooks/forecast/type";

const HomePage: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadForecast = async () => {
      setLoading(true);
      setError(null); // エラー状態をリセット
      try {
        const data = await fetchForecast();
        if (data) {
          setForecast(data);
        } else {
          setError('予報データが利用できません。');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('予期せぬエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };

    loadForecast();

    // オンラインになった時にデータを再取得
    const handleOnline = () => {
      console.log('Back online, fetching latest forecast.');
      loadForecast();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (loading) return <div>予報を読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;
  if (!forecast) return <div>予報データがありません。</div>;

  return (
    <div>
      <h2>{forecast.city.name} の天気予報</h2>
      {/* 詳細情報の表示 */}
      {forecast.list.map((item, index) => (
        <div key={index}>
          <p>{item.dt_txt}</p>
          <p>気温: {item.main.temp}°C</p>
          <p>天気: {item.weather[0].description}</p>
          {/* 必要に応じて他の詳細を追加 */}
        </div>
      ))}
      <button style={{ border: "1px solid black", marginTop: "20px" }} onClick={() => clearForecasts()}>Cache Clear</button>
    </div>
  );
};

HomePage.whyDidYouRender = true;
export default HomePage;
