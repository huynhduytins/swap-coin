import { Button } from "@mui/material";
import { useMode } from "../../../context/AppContext";

const SubmitButton = () => {
  const { isSwapping, setIsSwapping, handleSubmitSwap } = useMode();

  return isSwapping ? (
    <button className="flex justify-center items-center gap-2 w-full h-12 bg-light-500 rounded-[0.7rem] text-dark-400 dark:text-white">
      <span className="">Loading</span>
      <div className="flex justify-center items-center bg-gradient-to-t from-light-500  to-dark-400 dark:to-white w-7 h-7 rounded-full animate-spin">
        <div className="bg-light-500 w-6 h-6 rounded-full" />
      </div>
    </button>
  ) : (
    <Button
      variant="contained"
      className="w-full h-12  dark:text-dark-400"
      sx={{
        borderRadius: "0.7rem",
        backgroundColor: "#7B8EC8",
        ":hover": {
          backgroundColor: "#869bda",
        },
      }}
      onClick={() => {
        setIsSwapping(true);
        handleSubmitSwap();
      }}
    >
      <span className="dark:text-dark-400 font-bold font-kanit">
        CONFIRM SWAP
      </span>
    </Button>
  );
};

export default SubmitButton;
