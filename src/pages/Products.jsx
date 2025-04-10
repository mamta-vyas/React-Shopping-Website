// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import "./products.css"; // Create for styling
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  // Fetch all products
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
    setFilteredProducts(data);
  };

  // Fetch all categories
  const fetchCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle category filter
  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await res.json();
      setFilteredProducts(data);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
 

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Category Filter */}
      <div className="category-filter">
        <button onClick={() => handleCategoryChange("all")} className={selectedCategory === "all" ? "active" : ""}>All</button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={selectedCategory === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
            <button
              onClick={() => navigate(`/products/${product.id}`)}
            className="button"
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
