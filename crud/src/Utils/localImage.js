export const getImagePath = (imageName) => {
    try {
      return `/src/assets/product/${imageName}`;
      // return `../../assets/product/${imageName}`;
    } catch (error) {
      return 'https://via.placeholder.com/150'; // fallback image
    }
  };