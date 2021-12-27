import React, { useState } from "react";
import propTypes from "prop-types";
import { cn } from "@bem-react/classname";

import Select from "../select";
import Input from "../input";
import Textarea from "../textarea";

import "./styles.css";

const ArticleForm = (props) => {
  const className = cn("ArticleEdit");

  const [formData, setFormData] = useState({
    title: props.article?.title || "",
    description: props.article?.description || "",
    price: props.article?.price.toString() || "",
    edition: props.article?.edition.toString() || "",
    country: props.article?.maidIn._id || "",
    category: props.article?.category._id || "",
  });

  const handleChange = (key) => {
    return (value) => {
      setFormData({ ...formData, [key]: value });
    };
  };

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

    props.onSubmit(data);
  };

  return (
    <div className={className()}>
      <form onSubmit={submitHandler}>
        <div className={className("Input")}>
          <label>
            Название
            <Input theme="big" onChange={handleChange("title")} value={formData.title} />
          </label>
        </div>
        <div className={className("Input", { description: true })}>
          <label>
            Описание
            <Textarea value={formData.description} onChange={handleChange("description")} />
          </label>
        </div>
        <div className={className("Input")}>
          <label>
            Страна производитель
            <Select
              onChange={handleChange("country")}
              value={formData.country}
              options={props.countries}
            />
          </label>
        </div>
        <div className={className("Input")}>
          <label>
            Категория
            <Select
              onChange={handleChange("category")}
              value={formData.category}
              options={props.categories}
            />
          </label>
        </div>
        <div className={className("Input")}>
          <label>
            Год выпуска
            <Input theme="big" onChange={handleChange("edition")} value={formData.edition} />
          </label>
        </div>
        <div className={className("Input")}>
          <label>
            Цена
            <Input theme="big" onChange={handleChange("price")} value={formData.price} />
          </label>
        </div>

        <button disabled={props.waiting} type="submit">
          {props.waiting ? "Загрузка..." : "Отправить"}
        </button>
      </form>
      {!props.isValid && props.errors && (
        <div className={className("Errors")}>
          <h3 className={className("Errors", { Title: true })}>Ошибки</h3>
          {props.errors.map((error) => (
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
  errors: propTypes.array.isRequired,
  isValid: propTypes.bool.isRequired,
  waiting: propTypes.bool.isRequired,
  onSubmit: propTypes.func.isRequired,
};

ArticleForm.defaultProps = {
  article: {},
  countries: [],
  categories: [],
  errors: [],
  isValid: true,
  waiting: false,
  onSubmit: () => {},
};

export default React.memo(ArticleForm);
