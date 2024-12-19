import { ApiError } from "../../libs/errors/ApiError";

const ServerErrorPage: React.FC = () => {
  throw new ApiError(`APIエラーが発生しました`, 500, "Internal Server Error");
};

export default ServerErrorPage;
