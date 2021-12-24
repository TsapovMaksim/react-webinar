import StoreModule from "../module";

class CountriesStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      waiting: true,
    };
  }

  async load() {
    const response = await fetch("/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru");
    if (!response.ok) {
      this.setState({ ...this.getState(), waiting: false });
    }

    const json = await response.json();

    this.setState({
      ...this.getState(),
      items: json.result.items.map((el) => ({ ...el, value: el._id })),
      waiting: false,
    });
  }
}

export default CountriesStore;
