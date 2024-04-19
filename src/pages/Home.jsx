import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { SearchContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import { PizzaBlockStub } from '../components/PizzaBlockStub';
import { Sort } from '../components/Sort';
import { list } from '../components/constants';
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, pizzaSelector } from '../redux/slices/pizzaSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, status } = useSelector(pizzaSelector);
  const { categoryId, sort, currentPage } = useSelector(filterSelector);
  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const pizzas = items.map((pizza) => (
    <Link to={`pizza/${pizza.id}`} key={pizza.id}>
      <PizzaBlock {...pizza} />
    </Link>
  ));
  const pizzasStub = [...new Array(6)].map((_, index) => <PizzaBlockStub key={index} />);

  const handleCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(fetchPizzas({ category, search, sortType, currentPage }));
  };

  //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер, то проверяем параметры УРЛЫ и сохраняем в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <React.Fragment>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={handleCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="pizza__error">
          <h2>Произошла ошибка😕</h2>
          <p>К сожалению, не удалось получить питсы.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? pizzasStub : pizzas}</div>
      )}
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </React.Fragment>
  );
};
