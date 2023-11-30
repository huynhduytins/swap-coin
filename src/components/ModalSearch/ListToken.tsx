import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { TToken, TTokenList } from "../../types";

interface IListToken {
  chosenTokenList: TTokenList[] | undefined;
  handleChosenToken: (value: TTokenList | undefined) => void;
}

const ListToken = ({ chosenTokenList, handleChosenToken }: IListToken) => {
  return (
    <div className="h-[80%] mt-[108px] overflow-auto scrollbar scrollbar-thumb-light-400 scrollbar-track-gray-100 font-kanit">
      <List className="flex justify-center flex-col items-center">
        {chosenTokenList && chosenTokenList.length > 1 ? (
          chosenTokenList.map((token, idx) => (
            <ListItem
              disableGutters
              key={token.currency + idx}
              sx={{ width: "90%" }}
            >
              <ListItemButton
                onClick={() => handleChosenToken(token)}
                sx={{
                  borderRadius: "5px",
                  backgroundColor: idx === 0 ? "#E5E5E5" : "#fff",
                }}
                disabled={idx === 0}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <img src={`/assets/tokens/${token.currency}.svg`} alt="" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={token.currency}
                  sx={{ ".MuiTypography-root": { fontFamily: "Kanit" } }}
                  className="max-sm:invisible"
                />
                <p>{token.amount}</p>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <p className="mt-5">There is no token</p>
        )}
      </List>
    </div>
  );
};

export default ListToken;
