import React, { useState } from "react";
import propTypes from "prop-types";
import { cn } from "@bem-react/classname";

import Select from "../select";
import Input from "../input";

import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

import "./styles.css";

const ArticleForm = (props) => {
  const store = useStore();
  const className = cn("ArticleEdit");

  const select = useSelector((state) => ({
    waiting: state.article.edit.waiting,
    isValid: state.article.edit.isValid,
    errors: state.article.edit.errors,
  }));

  const [formData, setFormData] = useState({
    title: props.article?.title || "",
    description: props.article?.description || "",
    price: props.article?.price.toString() || "",
    edition: props.article?.edition.toString() || "",
    country: props.article?.maidIn._id || "",
    category: props.article?.category._id || "",
  });

  const handleChange = (value, key) => {
    setFormData({ ...formData, [key]: value });
  };

  const inputs = [
    { type: "text", title: "Название", name: "title" },
    { type: "textarea", title: "Описание", name: "description" },
    {
      type: "select",
      title: "Страна производитель",
      name: "country",
      options: props.countries,
    },
    {
      type: "select",
      title: "Категория",
      name: "category",
      options: props.categories,
    },
    { type: "text", title: "Год выпуска", name: "edition" },
    { type: "text", title: "Цена", name: "price" },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      _id: props.article._id,
      price: +formData["price"],
      edition: +formData["edition"],
      category: { _id: formData["category"] },
      maidIn: { _id: formData["country"] },
    };

    store.article.update(data);
  };

  return (
    <div className={className()}>
      <form onSubmit={submitHandler}>
        {inputs.map((el, idx) => (
          <div key={idx} className={className("Input")}>
            <label>
              {el.title}
              {el.type !== "select" && el.type !== "textarea" && (
                <Input
                  onChange={(value) => {
                    handleChange(value, el.name);
                  }}
                  value={formData[el.name]}
                />
              )}
              {el.type === "select" && (
                <Select
                  onChange={(value) => handleChange(value, el.name)}
                  value={formData[el.name]}
                  options={el.options}
                />
              )}
              {el.type === "textarea" && (
                <textarea
                  value={formData[el.name]}
                  onChange={(e) => handleChange(e.target.value, el.name)}
                />
              )}
            </label>
          </div>
        ))}
        <button disabled={select.waiting} type="submit">
          {select.waiting ? "Загрузка..." : "Отправить"}
        </button>
      </form>
      {!select.isValid && select.errors && (
        <div className={className("Errors")}>
          <h3 className={className("Errors", { Title: true })}>Ошибки</h3>
          {select.errors.map((error) => (
            <p key={error.path} className={className("Errors", { Item: true })}>
              {error.path} {error.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

ArticleForm.propTypes = {
  article: propTypes.object.isRequired,
  countries: propTypes.array.isRequired,
  categories: propTypes.array.isRequired,
};

ArticleForm.defaultProps = {
  article: {},
  countries: [],
  categories: [],
};

export default React.memo(ArticleForm);
