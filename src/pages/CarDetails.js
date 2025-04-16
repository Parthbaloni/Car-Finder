import { useParams } from 'react-router-dom';
import mockCars from '../data/mockCars';

const CarDetails = () => {
  const { id } = useParams();
  const car = mockCars.find(c => c.id === parseInt(id));

  if (!car) return <div>Car not found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
      <img src={car.image} alt={car.name} className="w-full h-96 object-cover rounded-lg" />
      <div className="mt-4 space-y-2">
        <p>Brand: {car.brand}</p>
        <p>Price: ${car.price.toLocaleString()}</p>
        <p>Fuel Type: {car.fuelType}</p>
        <p>Seating Capacity: {car.seating}</p>
      </div>
    </div>
  );
};

export default CarDetails;