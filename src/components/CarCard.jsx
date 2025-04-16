import { Link } from 'react-router-dom';  
import WishlistButton from './WishlistButton';  

const CarCard = ({ car, isInWishlist, darkMode }) => {  
  return (  
    <div  
      className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${  
        darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'  
      }`}  
    >  
      <img  
        src={car.image}  
        alt={car.name}  
        className="w-full h-48 object-cover rounded-lg mb-4"  
      />  
      <div className="flex justify-between items-start">  
        <div>  
          <h3  
            className={`text-xl font-semibold mb-2 ${  
              darkMode ? 'text-white' : 'text-gray-800'  
            }`}  
          >  
            {car.name}  
          </h3>  
          <div  
            className={`space-y-1 ${  
              darkMode ? 'text-gray-300' : 'text-gray-600'  
            }`}  
          >  
            <p>Brand: {car.brand}</p>  
            <p>Price: Rs {car.price.toLocaleString()}</p>  
            <p>Fuel: {car.fuelType}</p>  
            <p>Seats: {car.seating}</p>  
          </div>  
        </div>  
        <WishlistButton carId={car.id} isInWishlist={isInWishlist} />  
      </div>  
      <Link to={`/cars/${car.id}`}>  
        <button  
          className={`mt-4 w-full py-2 rounded-lg transition-colors ${  
            darkMode  
              ? 'bg-blue-600 hover:bg-blue-700 text-white'  
              : 'bg-blue-500 hover:bg-blue-600 text-white'  
          }`}  
        >  
          View Details  
        </button>  
      </Link>  
    </div>  
  );  
};  

export default CarCard;  