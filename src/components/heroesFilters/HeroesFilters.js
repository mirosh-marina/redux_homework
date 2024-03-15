import { useDispatch } from 'react-redux';
import { startFilter, delFilter, addActiveFilterElement } from "./filtersSlice";


// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {	
		
		const dispatch = useDispatch();			

		const handleClick = (e) => {
			dispatch(addActiveFilterElement(e.target.id))						
			const btns = document.querySelectorAll('.btn');
			btns.forEach(btn => btn.className.includes('active') ? btn.className = btn.className.replace(/\bactive\b/g, '').trim() : '')
			e.target.classList.add('active');
			
		}

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button onClick={(e) => handleClick(e)} id='all' className="btn btn-outline-dark active">Все</button>
                    <button onClick={(e) => handleClick(e)} id='fire' className="btn btn-danger">Огонь</button>
                    <button onClick={(e) => handleClick(e)} id='water' className="btn btn-primary">Вода</button>
                    <button onClick={(e) => handleClick(e)} id='wind' className="btn btn-success">Ветер</button>
                    <button onClick={(e) => handleClick(e)} id='earth' className="btn btn-secondary">Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;