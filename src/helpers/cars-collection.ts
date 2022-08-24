import Brand from '../types/brand';
import Car from '../types/car';
import Model from '../types/model';
import CarJoined from '../types/car-joined';

export default class CarsCollection {
    constructor(
        private brands: Brand[],
        private cars: Car[],
        private models: Model[],
    ) { }

    private joinCar = ({
 id, modelId, price, year,
}: Car): CarJoined => {
        const [modelObj] = this.models.filter((model) => model.id === modelId);
        const [brandObj] = this.brands.filter((brand) => brand.id === modelObj.brandId);
        return ({
            id,
            brand: brandObj.title,
            model: modelObj.title,
            price,
            year,
        });
    };

    get all(): CarJoined[] {
        return this.cars.map(this.joinCar);
    }
}
