import circlesSvg from "../assets/circles.svg";
import errorSvg from "../assets/error.svg";

type ILoaderProps = {
  isError: boolean;
};

const Loader = ({ isError }: ILoaderProps) => {
  const errorMessage = "Error loading data.";
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full text-red-500">
        <img src={errorSvg} alt="Error icon" className="w-12 h-12" />
        <p className="text-lg font-bold">Something went wrong.</p>
        {errorMessage && <p className="text-sm mt-2">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <img src={circlesSvg} alt="Loading spinner" className="w-12 h-12" />
    </div>
  );
};

export default Loader;
