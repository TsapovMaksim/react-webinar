import React, { useCallback } from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import ArticleForm from "../../components/article-form";

function EditArticle() {
  const store = useStore();
  // Параметры из пути
  const params = useParams();

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting || state.countries.waiting || state.categories.waiting,
    countries: state.countries.items,
    categories: state.categories.items,
    edit: state.article.edit,
  }));

  const callbacks = {
    onSubmit: useCallback((formData) => store.article.update(formData), [store]),
  };

  // Начальная загрузка
  useInit(async () => {
    store.article.load(params.id);
    store.categories.load();
    store.countries.load();
  }, [params.id]);

  if (select.waiting) {
    return (
      <Layout head={<h1>Loading ...</h1>}>
        <Header />
      </Layout>
    );
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header />

      <Spinner active={select.waiting}>
        <ArticleForm
          article={select.article}
          countries={select.countries}
          categories={select.categories}
          isValid={select.edit.isValid}
          waiting={select.edit.waiting}
          errors={select.edit.errors}
          onSubmit={callbacks.onSubmit}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(EditArticle);
