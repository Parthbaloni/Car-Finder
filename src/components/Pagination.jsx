const Pagination = ({ currentPage, totalPages, setCurrentPage, darkMode }) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center gap-2 mt-8">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 rounded ${
              currentPage === number 
                ? 'bg-blue-500 text-white' 
                : darkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-200'
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;