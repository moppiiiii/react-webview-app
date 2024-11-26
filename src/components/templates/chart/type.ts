import { ListItem } from "../../../hooks/forecast/type";
import { TIME_ZONE_CLASSIFICATION } from "../../../libs/date/constants";

export type ChartTemplateProps = {
  timeZoneClassification: (typeof TIME_ZONE_CLASSIFICATION)[keyof typeof TIME_ZONE_CLASSIFICATION];
  weatherList: ListItem[];
};
