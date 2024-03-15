import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { fetchHeroes } from "../../actions";
import { heroDeleted } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  // const {filters, startFilter, heroes, heroesLoadingStatus } = useSelector(state => state);
  const startFilter = useSelector((state) => state.filters.startFilter);

  const heroes = useSelector((state) => state.heroes.heroes);
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );

  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeBtn,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === "all") {
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filter);
      }
    }
  );

  const filteredHeroes = useSelector(filteredHeroesSelector);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes(request));

    // eslint-disable-next-line
  }, []);

  const handleDelHero = async (id) => {
    dispatch(heroDeleted(id));
    const response = await request(
      `http://localhost:3001/heroes/${id}`,
      "DELETE"
    );
  };

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (heroes) => {
    if (heroes.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    if (startFilter === "no") {
      return heroes.map(({ ...props }) => {
        return (
          <HeroesListItem
            key={props.id}
            handleDelHero={handleDelHero}
            {...props}
          />
        );
      });
    } else {
      if (filteredHeroes.length === 0) {
        return <h5 className="text-center mt-5">Таких героев нет</h5>;
      }
      return filteredHeroes.map(({ ...props }) => {
        return (
          <HeroesListItem
            key={props.id}
            handleDelHero={handleDelHero}
            {...props}
          />
        );
      });
    }
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
