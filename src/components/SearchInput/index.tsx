import { FC, memo, useCallback, ChangeEventHandler } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchInput: FC<Props> = ({ value, onChange, onSubmit }) => {
  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div>
      <input type="text" onChange={onValueChange} value={value} />
      <button onClick={onSubmit}>Search</button>
    </div>
  );
};

export default memo(SearchInput);
