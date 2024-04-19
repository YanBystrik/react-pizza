import * as React from 'react';
import debounce from 'lodash.debounce';

import search from '../../assets/img/search.svg';
import close from '../../assets/img/close.svg';
import s from './Search.module.scss';

import { SearchContext } from '../../App';

export const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={s.root}>
      <img className={s.icon} src={search} alt="SearchIcon" />
      <input
        ref={inputRef}
        className={s.search}
        placeholder="Поиск пиццы"
        value={value}
        onChange={onChangeInput}
      />
      {value && <img onClick={handleClear} className={s.iconClose} src={close} alt="CloseIcon" />}
    </div>
  );
};
