import StoreModule from "../module";
import qs from "qs";

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: "comma",
    encode: false,
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true,
  },
};

class CategoriesStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      waiting: true,
    };
  }

  /**
   * Загрузка сприска категорий
   *@return {Promise<void>}
   */
  async load() {
    const response = await fetch("/api/v1/categories?limit=*&fields=_id,parent,title");
    const json = await response.json();

    if (!response.ok) {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
      return;
    }
    const items = json.result.items;

    // получаем объект с родителями и их детьми
    const selectTree = items.reduce((acc, curr) => {
      if (curr.parent === null) {
        acc[curr._id] = { _id: curr._id, initialParent: true, title: curr.title, children: [] };
        return acc;
      }

      if (!(curr.parent._id in acc)) {
        const parent = items.find((item) => item._id === curr.parent._id);
        acc[parent._id] = { _id: parent._id, title: parent.title, children: [curr] };
        return acc;
      }

      acc[curr.parent._id].children.push(curr);
      return acc;
    }, {});

    const initialParents = Object.values(selectTree).filter((item) => item.initialParent);
    let selectValues = [];

    initialParents.forEach((parent) => {
      selectValues = [...selectValues, ...this.getSelectValues(parent, 0, selectTree)];
    });

    this.setState({
      ...this.getState(),
      items: selectValues,
      waiting: false,
    });
  }

  /**
   * Функция для получения массива значений селекта
   */
  getSelectValues(parent, level, selectTree) {
    let finalSelectValues = [];

    finalSelectValues.push({
      _id: parent._id,
      title: "-".repeat(level) + parent.title,
      value: parent._id,
    });

    for (let i = 0; i < parent.children.length; i++) {
      const childrenItem = parent.children[i];
      const newSelectItem = {
        _id: childrenItem._id,
        title: "-".repeat(level + 1) + childrenItem.title,
        value: childrenItem._id,
      };

      // Если ребенек тоже является родителем
      if (childrenItem._id in selectTree) {
        const childrenItems = this.getSelectValues(selectTree[childrenItem._id], level + 1, selectTree);
        finalSelectValues = [...finalSelectValues, ...childrenItems];
        continue;
      }

      finalSelectValues.push(newSelectItem);
    }
    return finalSelectValues;
  }
}

export default CategoriesStore;
