import { useEffect, useState, useRef, useCallback } from "react"; //  added useCallback
import ItemCard from "./ItemCard";
import { useCart } from "../Context/CartContext";

const Body = () => {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Ref for debounce timer
  const debounceRef = useRef(null);

  // Cart from context
  const { cart, addToCart } = useCart();

  // Memoized addToCart function
  const handleAddToCart = useCallback(
    (product) => addToCart(product),
    [addToCart]
  );

  // Fetch products from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setListOfProducts(data);
      setFilteredProducts(data);

      const categoryTypes = [...new Set(data.map((d) => d.category))];
      setCategories(categoryTypes);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  //  Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (searchText.trim() === "") {
        setFilteredProducts(listOfProducts);
      } else {
        const result = listOfProducts.filter((prod) =>
          prod.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProducts(result);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchText, listOfProducts]);

  // Top rated handler
  const handleTopRated = () => {
    const topRated = listOfProducts.filter((prod) => prod.rating.rate > 4);
    setFilteredProducts(topRated);
  };

  // Category filter
  const handleCategoryFilter = (userSelectedCategory) => {
    setSelectedCategory(userSelectedCategory);
    setSortOrder("");

    if (!userSelectedCategory) {
      setFilteredProducts(listOfProducts);
      return;
    }
    const catFiltered = listOfProducts.filter(
      (catProduct) => catProduct.category === userSelectedCategory
    );
    setFilteredProducts(catFiltered);
  };

  // Price sorting
  const handleSort = (order) => {
    const sortedProducts = [...filteredProducts];

    if (order === "LowToHigh") sortedProducts.sort((a, b) => a.price - b.price);
    else if (order === "HighToLow") sortedProducts.sort((a, b) => b.price - a.price);

    setFilteredProducts(sortedProducts);
    setSortOrder(order);
  };

  return (
    <div className="body p-5">
      <div className="flex items-center gap-2 mb-4">
        <input
          placeholder="Type to search"
          className="border-black border rounded-sm p-1"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          className="bg-green-950 p-1 text-white rounded-md hover:bg-green-700 hover:text-white"
          onClick={handleTopRated}
        >
          Top Rated
        </button>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-3 text-center text-gray-500">
            Loading products...
          </p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ItemCard key={product.id} product={product} addToCart={handleAddToCart} cartItems={cart} />
          ))
        ) : (
          <p className="col-span-3 text-center text-red-500 font-semibold">
            No products found!
          </p>
        )}
      </div>
    </div>
  );
};

export default Body;
