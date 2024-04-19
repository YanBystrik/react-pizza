import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';

interface PizzaType {
  imageUrl: string;
  title: string;
  price: number;
}

export const Pizza: React.FC = () => {
  const { id } = useParams();

  const [pizza, setPizza] = React.useState<PizzaType>();

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
