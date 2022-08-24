// import App from './components/app';
import CarsCollection from './helpers/cars-collection';
import brands from './data/brand';
import cars from './data/cars';
import models from './data/models';

// const app = new App('#root');
// app.initialize();

const carsCollection = new CarsCollection(brands, cars, models);
console.table(carsCollection.all);
const tbody = document.querySelector('tbody') as HTMLTableCaptionElement;

carsCollection.all.forEach((car) => {
    const tr = document.createElement('tr');
    Object.values(car).forEach((val) => {
        const td = document.createElement('td');
        td.textContent = val;
        tr.append(td);
    });
    tbody.append(tr);
});
