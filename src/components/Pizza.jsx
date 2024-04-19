import axios from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { pizzaSelector } from '../redux/slices/pizzaSlice';

export const Pizza = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(`https://63e901d85f3e35d898f93542.mockapi.io/items/` + id);
        setPizza(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPizza();
  }, []);

  if (!pizza) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};
