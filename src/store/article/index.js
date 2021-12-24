import StoreModule from "../module";

class ArticleStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      waiting: true,
      edit: {
        waiting: false,
        isValid: true,
        errors: [],
      },
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id) {
    this.updateState({
      waiting: true,
      data: {},
    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
      );
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        waiting: false,
      });
    } catch (e) {
      this.updateState({
        data: {},
        waiting: false,
      });
    }
  }

  async update(data) {
    this.updateState({ edit: { waiting: true } });

    const response = await fetch(`/api/v1/articles/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const json = await response.json();

      this.updateState({
        edit: { waiting: false, isValid: false, errors: json.error.data.issues },
      });
      return;
    }

    const json = await response.json();
    this.updateState({ data: json.result, edit: { waiting: false, isValid: true, errors: [] } });
  }
}

export default ArticleStore;
