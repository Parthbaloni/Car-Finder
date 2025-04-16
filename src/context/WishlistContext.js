import { createContext, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (carId) => {
    if (!wishlist.includes(carId)) {
      setWishlist([...wishlist, carId]);
    }
  };

  const removeFromWishlist = (carId) => {
    setWishlist(wishlist.filter((id) => id !== carId));
  };

  const isInWishlist = (carId) => wishlist.includes(carId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
