import { ApiError } from "../../libs/errors/ApiError";

const UnauthorizedPage: React.FC = () => {
  throw new ApiError(`APIエラーが発生しました`, 401, "Unauthorized");
};

export default UnauthorizedPage;
