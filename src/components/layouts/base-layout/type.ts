import { TIME_ZONE_CLASSIFICATION } from "../../../libs/date/constants";

export type BaseLayoutProps = {
  children: React.ReactNode;
  timeZoneClassification: (typeof TIME_ZONE_CLASSIFICATION)[keyof typeof TIME_ZONE_CLASSIFICATION];
};
