import * as React from 'react';
import ReactPaginate from 'react-paginate';

import s from './Pagination.module.scss';

export const Pagination = ({ value, onChangePage }) => {
  return (
    <ReactPaginate
      className={s.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={value - 1}
      renderOnZeroPageCount={null}
    />
  );
};
