import { BiSearchAlt } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { InputAdornment, TextField } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import ListToken from "./ListToken";
import { useMode } from "../../context/AppContext";
import { TTokenList } from "../../types";

interface IFormSearch {
  onClose: () => void;
  handleChosenToken: (value: TTokenList | undefined) => void;
  isToToken?: boolean;
}

const FormSearch = ({ onClose, isToToken, handleChosenToken }: IFormSearch) => {
  const ref = useRef<HTMLDivElement | null | undefined>();
  const { tokenList, fromToken, toToken } = useMode();

  const [chosenTokenList, setChosenTokenList] = useState<
    TTokenList[] | undefined
  >();

  const [tokenInput, setTokenInput] = useState<string>("");

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    let tokenChosenIndex;
    if (isToToken) {
      tokenChosenIndex = tokenList.findIndex(
        (el) =>
          el.currency + el.date ===
          (toToken?.currency as string) + toToken?.date
      );
    } else {
      tokenChosenIndex = tokenList.findIndex(
        (el) =>
          el.currency + el.date ===
          (fromToken?.currency as string) + fromToken?.date
      );
    }

    let newTokenFilter = [
      tokenList[tokenChosenIndex],
      ...tokenList.slice(0, tokenChosenIndex),
      ...tokenList.slice(tokenChosenIndex + 1),
    ];

    if (tokenInput !== "") {
      newTokenFilter = newTokenFilter.filter((el, idx) => {
        return (
          el.currency.toLowerCase().includes(tokenInput.toLowerCase()) ||
          idx === 0
        );
      });
    }

    setChosenTokenList(newTokenFilter);
  }, [tokenInput]);

  return (
    <div className="w-[500px] h-[65vh] max-sm:w-[100%] relative">
      <IoIosArrowBack
        className="absolute top-5 left-5 w-5 h-5 cursor-pointer z-10 max-sm:left-2"
        onClick={onClose}
      />
      <div className="absolute w-full top-14 left-1/2 font-kanit transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-5">
        <h1 className="font-bold w-full text-xl text-center">Select Token</h1>
        <TextField
          inputRef={ref}
          variant="outlined"
          size="small"
          type="text"
          autoComplete="off"
          className="w-[90%]"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiSearchAlt />
              </InputAdornment>
            ),
          }}
          sx={{
            ".MuiInputBase-input": {
              fontFamily: "Kanit",
            },
          }}
          onChange={(e) => setTokenInput(e.target.value)}
        />
      </div>
      <ListToken
        chosenTokenList={chosenTokenList}
        handleChosenToken={handleChosenToken}
      />
    </div>
  );
};

export default FormSearch;
