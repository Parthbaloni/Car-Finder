const Filters = ({
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
    fuelType,
    setFuelType,
    seating,
    setSeating,
    sortBy,
    setSortBy,
    darkMode
  }) => {
    return (
      <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
  
          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className={`p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <option value="all">All Brands</option>
            <option value="Mahindra">Mahindra</option>
            <option value="Toyota">Toyota</option>
            <option value="Tata">Tata</option>
            <option value="Maruti">Maruti</option>
            <option value="Honda">Honda</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Mercedes">Mercedes</option>
            <option value="BMW">BMW</option>
            {/* Add more brands */}
          </select>
  
          {/* Price Range */}
          <div className="flex flex-col">
            <label className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Price Range: Rs{priceRange[0]} - Rs{priceRange[1]}
            </label>
            <input
              type="range"
              min="700000"
              max="20000000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
              className="w-full"
            />
          </div>
  
          {/* Add other filters similarly */}
        </div>
      </div>
    );
  };
  
  export default Filters;