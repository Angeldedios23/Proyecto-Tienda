import React, { useEffect, useState } from 'react';
import './ProductCategoryManagement.css'; // Import the custom styles

const ProductCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    try {
      if (editCategoryId) {
        await fetch(`http://localhost:3001/categories/${editCategoryId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: categoryName }),
        });
      } else {
        await fetch('http://localhost:3001/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: categoryName }),
        });
      }
      setCategoryName('');
      setEditCategoryId(null);
      loadCategories();
    } catch (error) {
      console.error('Error creating or updating category:', error);
    }
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editProductId) {
        await fetch(`http://localhost:3001/products/${editProductId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: productName,
            description: productDescription,
            price: productPrice,
            imageUrl: productImageUrl,
            categoryId: productCategoryId,
          }),
        });
      } else {
        await fetch('http://localhost:3001/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: productName,
            description: productDescription,
            price: productPrice,
            imageUrl: productImageUrl,
            categoryId: productCategoryId,
          }),
        });
      }
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImageUrl('');
      setProductCategoryId('');
      setEditProductId(null);
      loadProducts();
    } catch (error) {
      console.error('Error creating or updating product:', error);
    }
  };

  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setEditCategoryId(category.id);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await fetch(`http://localhost:3001/categories/${id}`, {
        method: 'DELETE',
      });
      loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setProductImageUrl(product.imageUrl);
    setProductCategoryId(product.categoryId);
    setEditProductId(product.id);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: 'DELETE',
      });
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleLogout = () => {
    // Implementación básica de cierre de sesión
    // Puedes personalizar esto según tus necesidades de autenticación
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <h1>Gestión de Productos y Categorías</h1>

      <div className="form-group">
        <h2>{editCategoryId ? 'Editar Categoría' : 'Crear Categoría'}</h2>
        <form onSubmit={handleCategorySubmit}>
          <input
            className="input-field"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Nombre de la categoría"
            required
          />
          <button className="submit-btn" type="submit">{editCategoryId ? 'Guardar Cambios' : 'Crear Categoría'}</button>
        </form>
      </div>

      <div className="form-group">
        <h2>{editProductId ? 'Editar Producto' : 'Crear Producto'}</h2>
        <form onSubmit={handleProductSubmit}>
          <input
            className="input-field"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
          <input
            className="input-field"
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Descripción del producto"
            required
          />
          <input
            className="input-field"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Precio"
            required
          />
          <input
            className="input-field"
            type="text"
            value={productImageUrl}
            onChange={(e) => setProductImageUrl(e.target.value)}
            placeholder="URL de la imagen"
          />
          <select
            className="input-field"
            value={productCategoryId}
            onChange={(e) => setProductCategoryId(e.target.value)}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button className="submit-btn" type="submit">{editProductId ? 'Guardar Cambios' : 'Crear Producto'}</button>
        </form>
      </div>

      <div className="category-section">
        <h2>Categorías</h2>
        <div className="category-list">
          {categories.map((category) => (
            <div className="category-card" key={category.id}>
              <h3>{category.name}</h3>
              <button className="action-btn edit-btn" onClick={() => handleEditCategory(category)}>Editar</button>
              <button className="action-btn delete-btn" onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>

            </div>
          ))}
        </div>
      </div>

      <div className="product-section">
        <h2>Productos</h2>
        <div className="product-list">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Precio: ${product.price}</p>
              <img src={product.imageUrl} alt={product.name} width="100" />
              <button className="action-btn edit-product-btn" onClick={() => handleEditProduct(product)}>Editar</button>
              <button className="action-btn delete-product-btn" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryManagement;