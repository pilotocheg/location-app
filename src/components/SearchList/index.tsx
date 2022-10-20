import { FC, memo } from "react";

import "./style.sass";

export interface HistoryItem {
  id: number;
  text: string;
}

interface Props {
  list: HistoryItem[];
}

const SearchList: FC<Props> = ({ list }) => {
  return (
    <div className="search-list">
      <p className="title">Search history:</p>
      <ul>
        {list.map(({ id, text }) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default memo(SearchList);
