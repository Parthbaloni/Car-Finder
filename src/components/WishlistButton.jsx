import { useContext } from 'react';  
import { WishlistContext } from '../context/WishlistContext';  
import { HeartIcon } from '@heroicons/react/24/solid';  

const WishlistButton = ({ carId, isInWishlist }) => {  
  const { addToWishlist, removeFromWishlist } = useContext(WishlistContext);  

  return (  
    <button  
      onClick={() => (isInWishlist ? removeFromWishlist(carId) : addToWishlist(carId))}  
      className="p-2 hover:scale-110 transition-transform"  
    >  
      <HeartIcon  
        className={`w-6 h-6 ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}  
      />  
    </button>  
  );  
};  

export default WishlistButton;  