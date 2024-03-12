import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { addNewHero, filter } from "../../actions";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
	const {startFilter, activeBtn } = useSelector(state => state.filters)

	const isFilter = (data) => {
		if (startFilter === 'yes' && data.payload.element === activeBtn) {
			dispatch(filter(data.payload.element))
		}
	}

  const handleSubmit = async (values) => {
    try {
      const response = await request(
        "http://localhost:3001/heroes",
        "POST",
        JSON.stringify(values)
      ).then((data) => dispatch(addNewHero(data)))
				.then(data => isFilter(data));

			

    } catch (error) {
      console.error("Ошибка", error);
    }    
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
          element: "",
        }}
				validationSchema={Yup.object({
					name: Yup.string()
						.min(2, "Минимум 2 символа")
						.matches(/^\S.*\S$/, 'Имя не должно состоять только из пробелов')
						.required("Обязательное поле!"),
					description: Yup.string()
						.min(5, 'Минимум 5 символов')
						.matches(/^\S.*\S$/, 'Имя не должно состоять только из пробелов')
						.required('Обязательное поле!'),
					element: Yup.string().required('Выберите элемент')
				})}
        onSubmit={(values, {resetForm}) => {handleSubmit(values); resetForm()}}
      >
				
					<Form className="border p-4 shadow-lg rounded">
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">
              Имя нового героя
            </label>
            <MyTextInput
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Как меня зовут?"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descriprion" className="form-label fs-4">
              Описание
            </label>
            <MyTextInput
              name="description"
              className="form-control"
              id="description"
              placeholder="Что я умею?"
              style={{ height: "130px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="element" className="form-label">
              Выбрать элемент героя
            </label>
            <Field
              as="select"
              className="form-select"
              id="element"
              name="element"
            >
							
              <option value='' disabled>Я владею элементом...</option>
              <option value="fire">Огонь</option>
              <option value="water">Вода</option>
              <option value="wind">Ветер</option>
              <option value="earth">Земля</option>
            </Field>
						<ErrorMessage className="error" name="element" component="div"/>
          </div>

          <button type="submit" className="btn btn-primary">
            Создать
          </button>
        </Form>
				
        
      </Formik>
    </>
  );
};

export default HeroesAddForm;
