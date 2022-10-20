import classNames from "classnames";
import { FC, memo, useCallback, ChangeEventHandler, FormEvent } from "react";
import Button from "../Button";

import "./style.sass";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  error?: string;
  loading?: boolean;
}

const SearchInput: FC<Props> = ({
  value,
  onChange,
  onSubmit,
  error,
  loading,
}) => {
  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (value && !loading) {
        onSubmit();
      }
    },
    [value, onSubmit, loading]
  );

  return (
    <form className="search-input-container" onSubmit={onFormSubmit}>
      <div className="input-wrapper">
        <input
          className={classNames("search-input", { error: !!error })}
          type="text"
          onChange={onValueChange}
          value={value}
          placeholder="www.example.com or 87.87.87.87"
        />
        {error && <span className="search-input-error">{error}</span>}
      </div>
      <Button type="submit" disabled={!value} loading={loading || true}>
        Search
      </Button>
    </form>
  );
};

export default memo(SearchInput);
