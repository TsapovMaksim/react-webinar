import StoreModule from "../module";

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      count: 0,
      pagination: {
        startValue: 1,
        endValue: 0,
        page: 1,
      },
      // skip: 0,
    };
  }

  /**
   * Загрузка списка товаров
   * @param pageNumber {Number} Номер страницы начиная с 1
   */
  async load(pageNumber) {
    const skip = (pageNumber - 1) * 10;
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    const count = json.result.count;

    this.setState({
      items: json.result.items,
      count: count,
      pagination: {
        startValue: 1,
        endValue: Math.ceil(count / 10),
        page: pageNumber,
      },
    });
  }
}

export default CatalogStore;
