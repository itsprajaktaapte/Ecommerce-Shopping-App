import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const Body = () => {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Fetch products from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setListOfProducts(data);
      setFilteredProducts(data); // show all products initially

      const categoryTypes = [...new Set(data.map((d) => d.category))];
      setCategories(categoryTypes);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  /* only setFilteredProducts state is updated keeping original data- setListOfProducts intact */
  // Search handler
  const handleSearch = () => {
    const result = listOfProducts.filter((prod) =>
      prod.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(result);
    setSearchText("");
  };

  // Top rated handler
  const handleTopRated = () => {
    const topRated = listOfProducts.filter((prod) => prod.rating.rate > 4);
    setFilteredProducts(topRated);
  };

  // CategoryFilter

  const handleCategoryFilter = (userSelectedCategory) => {
    setSelectedCategory(userSelectedCategory);
    setSortOrder("");

    // empty string → show all products / or user wants to switch from particular cat to select cat
    if (!userSelectedCategory) {
      setFilteredProducts(listOfProducts);
      return;
    }
    const catFiltered = listOfProducts.filter(
      (catProduct) => catProduct.category === userSelectedCategory
    );
    setFilteredProducts(catFiltered);
  };

  // price sorting- based on selected category
  const handleSort = (order) => {
    const sortedProducts = [...filteredProducts]; // passing copy

    if (order === "LowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "HighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
    setSortOrder(order);
  };

  return (
    <div className="body p-5">
      {/* user entered search : e -> event object */}
      <div className="flex items-center gap-2 mb-4">
        <input
          placeholder="Type to search"
          className="border-black border rounded-sm p-1"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/*  search product */}
        <button
          className="bg-green-950 p-1 text-white rounded-md hover:bg-green-700 hover:text-white"
          onClick={handleSearch}
        >
          Search
        </button>
        {/* check top rated product */}
        <button
          className="bg-green-950 p-1 text-white rounded-md hover:bg-green-700 hover:text-white"
          onClick={handleTopRated}
        >
          Top Rated
        </button>

        {/*  user selected product categories : e -> event object */}

        <select
          className="border border-black rounded-md p-2"
          onChange={(e) => handleCategoryFilter(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Show price sort button ONLY if a category is selected */}
        {selectedCategory && (
          <select
            className="border border-black rounded-md p-2 ml-2"
            onChange={(e) => handleSort(e.target.value)}
            value={sortOrder}
          >
            <option>Sort by Price</option>
            <option value="LowToHigh">Low to High</option>
            <option value="HighToLow">High to Low</option>
          </select>
        )}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (<p className="col-span-3 text-center text-gray-500">Loading products...</p>) 
        : 
        filteredProducts.length > 0 ? (filteredProducts.map((product)=>(<ItemCard key={product.id} product={product}/>))
        ) 
        :
        (<p className="col-span-3 text-center text-red-500 font-semibold">No products found!</p>)}
      </div>
    </div>
  );
};

export default Body;
