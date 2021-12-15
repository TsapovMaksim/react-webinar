import StoreModule from "../module";

class CurrentTovarStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      item: {},
      loadingState: false,
    };
  }

  /**
   * Загрузка товара по id
   */
  async load(id) {
    this.setState({
      item: {},
      loadingState: false,
    });
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState({
      loadingState: true,
      item: {
        ...json.result,
      },
    });
  }
}

export default CurrentTovarStore;
