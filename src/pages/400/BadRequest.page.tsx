import { ApiError } from "../../libs/errors/ApiError";

const BadRequestPage: React.FC = () => {
  throw new ApiError(`APIエラーが発生しました`, 400, "Bad Request");
};

export default BadRequestPage;
