import FavouriteList from "@/component/Home/favourite/Favourite";


const FavouritesPage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">My Favourites ❤️</h1>
      <FavouriteList />
    </div>
  );
}

export default FavouritesPage