import { z } from "zod";
import { WEATHER_TYPE } from "../../components/ui/weather-icon/constants";

const CoordSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

const CitySchema = z.object({
  id: z.number(),
  name: z.string(),
  coord: CoordSchema,
  country: z.string(),
  population: z.number(),
  timezone: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
});

const MainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  sea_level: z.number(),
  grnd_level: z.number(),
  humidity: z.number(),
  temp_kf: z.number(),
});

const weatherTypeValues = Object.values(WEATHER_TYPE) as [
  (typeof WEATHER_TYPE)[keyof typeof WEATHER_TYPE],
  ...(typeof WEATHER_TYPE)[keyof typeof WEATHER_TYPE][],
];

const WeatherSchema = z.object({
  id: z.number(),
  main: z.enum(weatherTypeValues),
  description: z.string(),
  icon: z.string(),
});

const CloudsSchema = z.object({
  all: z.number(),
});

const WindSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number(),
});

const RainSchema = z
  .object({
    "3h": z.number(),
  })
  .optional();

const SysSchema = z.object({
  pod: z.string(),
});

const ListItemSchema = z.object({
  dt: z.number(),
  main: MainSchema,
  weather: z.array(WeatherSchema),
  clouds: CloudsSchema,
  wind: WindSchema,
  visibility: z.number(),
  pop: z.number(),
  sys: SysSchema,
  dt_txt: z.string(),
  rain: RainSchema,
});

export const ForecastResponseSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(ListItemSchema),
  city: CitySchema,
});

export type ListItem = z.TypeOf<typeof ListItemSchema>;
export type ForecastResponse = z.TypeOf<typeof ForecastResponseSchema>;

export type UseForecastResponse = {
  data: ForecastResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown | undefined;
  mutate: () => Promise<ForecastResponse | undefined>;
};
