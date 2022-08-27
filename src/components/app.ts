import stringifyObjectProps, { StringifiedObject } from '../helpers/stringify-object-props';
import CarsCollection from '../helpers/cars-collection';
import CarJoined from '../types/car-joined';

import brands from '../data/brand';
import cars from '../data/cars';
import models from '../data/models';

import Table from './table';
import SelectField from './select-field';

const ALL_CATEGORIES_ID = '-1';
const ALL_BRANDS_TITLE = 'All Brands';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private carsTable: Table<StringifiedObject<CarJoined>>;

  private selectCategoryId: string;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    if (!foundElement) throw new Error(`Element with selector: '${selector}' doesn't exist`);

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection(brands, cars, models);
    this.carsTable = new Table({
      title: ALL_BRANDS_TITLE,
      columns: {
        id: 'Id',
        brand: 'Brand',
        model: 'Model',
        price: 'Price',
        year: 'Year',
      },
      rowsData: this.carsCollection.all.map(stringifyObjectProps),
      onDelete: this.handleCarDelete,
    });
    this.selectCategoryId = ALL_CATEGORIES_ID;
  }

  private handleCategoryChange = (categoryId: string) => {
    this.selectCategoryId = categoryId;

    this.update();
  };

  private handleCarDelete = (carId: string): void => {
    this.carsCollection.deleteCarById(carId);

    this.update();
  };

  private update = () => {
    if (this.selectCategoryId === ALL_CATEGORIES_ID) {
      this.carsTable.updateProps({
        title: ALL_BRANDS_TITLE,
        rowsData: this.carsCollection.all.map(stringifyObjectProps),
      });
    } else {
      const categoryTitle = brands.find((brand) => brand.id === this.selectCategoryId)
        ?.title ?? 'Name not found.';
      this.carsTable.updateProps({
        title: categoryTitle,
        rowsData: this.carsCollection.getByCategoryId(this.selectCategoryId)
          .map(stringifyObjectProps),
      });
    }
  };

  initialize = (): void => {
    const categorySelect = new SelectField({
      label: 'Brands',
      options: [
        { label: ALL_BRANDS_TITLE, value: ALL_CATEGORIES_ID },
        ...brands.map(({ title, id }) => ({
          label: title,
          value: id,
        })),
      ],
      onChange: this.handleCategoryChange,
    });

    const container = document.createElement('div');
    container.className = 'container my-5';
    container.append(categorySelect.htmlElement);
    container.append(this.carsTable.htmlElement);

    this.htmlElement.append(container);
  };
}

export default App;
