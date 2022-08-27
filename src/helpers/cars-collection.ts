import Brand from '../types/brand';
import Car from '../types/car';
import Model from '../types/model';
import CarJoined from '../types/car-joined';
import models from '../data/models';

export default class CarsCollection {
    constructor(
        private brands: Brand[],
        private cars: Car[],
        private carModels: Model[],
    ) { }

    private joinCar = ({
        modelId, ...props
    }: Car): CarJoined => {
        const modelObj = this.carModels.find((model) => model.id === modelId);
        const brandObj = this.brands.find((brand) => brand.id === modelObj?.brandId);
        return ({
            brand: (brandObj && brandObj.title) ?? '',
            model: (modelObj && modelObj.title) ?? '',
            ...props,
        });
    };

    get all(): CarJoined[] {
        return this.cars.map(this.joinCar);
    }

    getByCategoryId = (brandId: string): CarJoined[] => {
        const modelsIds = models.filter((model) => model.brandId === brandId)
            .map((model) => model.id);

        const joinedCars = this.cars.filter((car) => modelsIds.includes(car.modelId))
            .map(this.joinCar);

        return joinedCars;
    };

    public deleteCarById = (carId: string): void => {
        this.cars = this.cars.filter((car) => car.id !== carId);
    };
}
