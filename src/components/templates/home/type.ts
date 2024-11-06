import { ListItem } from "../../../hooks/forecast/type";
import { TIME_ZONE_CLASSIFICATION } from "../../../libs/date/constants";

export type HomeTemplateProps = {
  currentDate: string;
  currentTime: string;
  timeZoneClassification: (typeof TIME_ZONE_CLASSIFICATION)[keyof typeof TIME_ZONE_CLASSIFICATION];
  listItem: ListItem[];
};
