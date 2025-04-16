// src/pages/Home.js  
import { useState, useEffect, useContext } from 'react';  
import CarCard from '../components/CarCard';  
import Filters from '../components/Filters';  
import Pagination from '../components/Pagination';  
import { WishlistContext } from '../context/WishlistContext';  
import Loader from '../components/Loader';  

const Home = () => {  
  const { wishlist } = useContext(WishlistContext);  
  const [cars, setCars] = useState([]);  
  const [filteredCars, setFilteredCars] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [carsPerPage] = useState(10);  
  const [loading, setLoading] = useState(false);  
  const [darkMode, setDarkMode] = useState(false);  

  // Filter states  
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedBrand, setSelectedBrand] = useState('all');  
  const [priceRange, setPriceRange] = useState([700000, 10000000]);  
  const [fuelType, setFuelType] = useState('all');  
  const [seating, setSeating] = useState('all');  
  const [sortBy, setSortBy] = useState('none');  

  // Mock Cars Data (You can replace this with API data)  
  const mockCars = [  
    {  
      id: 1,  
      name: 'AMG',  
      brand: 'Mercedes',  
      price: 8500000,  
      fuelType: 'Petrol',  
      seating: 7,  
      image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/AMG-GT-Coupe/11053/1692608827675/front-left-side-47.jpg',  
    },  
    {  
      id: 2,  
      name: 'M5',  
      brand: 'BMW',  
      price: 9500000,  
      fuelType: 'Diesel',  
      seating: 5,  
      image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg',  
    }, 
    {  
      id: 3,  
      name: 'Fortuner',  
      brand: 'Toyota',  
      price: 4500000,  
      fuelType: 'Petrol',  
      seating: 7,  
      image: 'data:image/jpeg;base64,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',  
    },
    {  
      id: 4,  
      name: 'Thar',  
      brand: 'Mahindra',  
      price: 1700000,  
      fuelType: 'Diesel',  
      seating: 5,  
      image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202408/mahindra-thar-roxx-200912599-16x9_0.jpg?VersionId=8gFUdclSl6.epCT95iSrtU5MCXzyDyRR&size=690:388',  
    },
    {  
      id: 5,  
      name: 'Creta',  
      brand: 'Hyundai',  
      price: 1700000,  
      fuelType: 'Diesel',  
      seating: 5,  
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOhw4Ev8D0WUFT6EWasR188fj5U14D7SyW5A&s',  
    },
    {  
      id: 6,  
      name: 'Swift',  
      brand: 'Maruti',  
      price: 800000,  
      fuelType: 'Petrol',  
      seating: 5,  
      image: 'https://media.umbraco.io/suzuki-gb/vyuhzguv/10816_suzuki_swift_512_r1.jpg',  
    },
    {  
      id: 7,  
      name: 'Glanza',  
      brand: 'Toyota',  
      price: 900000,  
      fuelType: 'Petrol',  
      seating: 5,  
      image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/112839/glanza-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80',  
    },
    {  
      id: 8,  
      name: 'Baleno',  
      brand: 'Maruti',  
      price: 800000,  
      fuelType: 'Petrol',  
      seating: 5,  
      image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/102663/baleno-exterior-right-front-three-quarter-64.jpeg?isig=0&q=80',  
    },
    {  
      id: 9,  
      name: 'Punch',  
      brand: 'Tata',  
      price: 700000,  
      fuelType: 'Petrol',  
      seating: 5,  
      image: 'https://images.hindustantimes.com/auto/img/2024/07/01/600x338/HT_Auto_1719807854739_1719807867346.jpg',  
    },
    {  
      id: 10,  
      name: 'Nexon',  
      brand: 'Tata',  
      price: 1200000,  
      fuelType: 'Petrol',  
      seating: 5,  
      image: 'https://siwansamachar.in/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-12-at-12.46.47-PM.jpeg',  
    },
    {  
      id: 11,  
      name: 'Verna',  
      brand: 'Hyundai',  
      price: 1300000,  
      fuelType: 'Petrol',  
      seating: 5,  
      image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Verna/8703/1736412929424/front-left-side-47.jpg',  
    },
    {  
      id: 12,  
      name: 'Civic',  
      brand: 'Honda',  
      price: 2300000,  
      fuelType: 'Petrol',  
      seating: 5,  
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Imd6TKiFWL8wsYIbCc4RpRYmF7JNqrPtp2wsITedNMvAWZ4fkyS2OqS_YI96BMeLTJc&usqp=CAU',  
    },
    {  
      id: 13,  
      name: 'Amaze',  
      brand: 'Honda',  
      price: 800000,  
      fuelType: 'Petrol',  
      seating: 5,  
      image: 'https://www.cars24.com/new-cars/_next/image/?url=https%3A%2F%2Fcdn.cars24.com%2Fprod%2Fnew-car-cms%2FHonda%2FNew-Amaze%2F2024%2F12%2F04%2Ffa493e55-8d3d-4070-a0f2-4438c788d549-3-_32_.png&w=750&q=75',  
    },

    // Add more mock cars as needed  
  ];  

  useEffect(() => {  
    const fetchCars = async () => {  
      setLoading(true);  
      // Simulate API call  
      setTimeout(() => {  
        setCars(mockCars);  
        setLoading(false);  
      }, 1000);  
    };  
    fetchCars();  
  }, []);  

  useEffect(() => {  
    applyFilters();  
  }, [cars, searchTerm, selectedBrand, priceRange, fuelType, seating, sortBy]);  

  const applyFilters = () => {  
    let result = [...cars];  

    // Search filter  
    if (searchTerm) {  
      result = result.filter((car) =>  
        car.name.toLowerCase().includes(searchTerm.toLowerCase())  
      );  
    }  

    // Brand filter  
    if (selectedBrand !== 'all') {  
      result = result.filter((car) => car.brand === selectedBrand);  
    }  

    // Price filter  
    result = result.filter(  
      (car) => car.price >= priceRange[0] && car.price <= priceRange[1]  
    );  

    // Fuel type filter  
    if (fuelType !== 'all') {  
      result = result.filter((car) => car.fuelType === fuelType);  
    }  

    // Seating filter  
    if (seating !== 'all') {  
      result = result.filter((car) => car.seating === parseInt(seating));  
    }  

    // Sorting  
    if (sortBy === 'price_asc') {  
      result.sort((a, b) => a.price - b.price);  
    } else if (sortBy === 'price_desc') {  
      result.sort((a, b) => b.price - a.price);  
    }  

    setFilteredCars(result);  
  };  

  // Get current cars  
  const indexOfLastCar = currentPage * carsPerPage;  
  const indexOfFirstCar = indexOfLastCar - carsPerPage;  
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);  

  return (  
    <div  
      className={`min-h-screen p-8 ${  
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'  
      }`}  
    >  
      <div className="max-w-7xl mx-auto">  
        <div className="flex justify-between items-center mb-8">  
          <h1 className="text-3xl font-bold">Car Finder</h1>  
          <button  
            onClick={() => setDarkMode(!darkMode)}  
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"  
          >  
            {darkMode ? '🌞 Light' : '🌙 Dark'}  
          </button>  
        </div>  

        <Filters  
          searchTerm={searchTerm}  
          setSearchTerm={setSearchTerm}  
          selectedBrand={selectedBrand}  
          setSelectedBrand={setSelectedBrand}  
          priceRange={priceRange}  
          setPriceRange={setPriceRange}  
          fuelType={fuelType}  
          setFuelType={setFuelType}  
          seating={seating}  
          setSeating={setSeating}  
          sortBy={sortBy}  
          setSortBy={setSortBy}  
          darkMode={darkMode}  
        />  

        {loading ? (  
          <Loader />  
        ) : (  
          <>  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">  
              {currentCars.map((car) => (  
                <CarCard  
                  key={car.id}  
                  car={car}  
                  isInWishlist={wishlist.includes(car.id)}  
                  darkMode={darkMode}  
                />  
              ))}  
            </div>  

            <Pagination  
              carsPerPage={carsPerPage}  
              totalCars={filteredCars.length}  
              currentPage={currentPage}  
              setCurrentPage={setCurrentPage}  
              darkMode={darkMode}  
            />  
          </>  
        )}  
      </div>  
    </div>  
  );  
};  

export default Home;  