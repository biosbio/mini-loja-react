

// ProductList.jsx
import React, { useEffect, useState, useRef } from 'react';
import Api from '../services/Api';
import './App.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    Api.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setExpandedIndex(null);
      }
    };

    if (expandedIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // bloqueia scroll da página quando expandido
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [expandedIndex]);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="p-3" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* <button className="p-button-primary mb-4">Criar Produto</button> */}

      <div className="p-grid">
        {products.map((product, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={product.id}
              className="p-col-12 md:p-col-3 p-3"
              style={{
                boxSizing: 'border-box',
                zIndex: isExpanded ? 1100 : 'auto',
                position: isExpanded ? 'relative' : 'static',
              }}
            >
              <div
                ref={isExpanded ? cardRef : null}
                className={`card card-hover ${isExpanded ? 'expanded' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedIndex(prev => (prev === index ? null : index));
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className={`product-image ${isExpanded ? 'expanded-image' : ''}`}
                />
                <div className="p-4 flex-grow-1 flex flex-column justify-content-between">
                  <h2
                    className={isExpanded ? 'expanded-title' : 'collapsed-title'}
                    title={product.title}
                  >
                    {product.title}
                  </h2>
                  <p
                    className={isExpanded ? 'expanded-description' : 'product-description'}
                    title={product.description}
                  >
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-500 category-text">
                    {product.category}
                  </p>
                  <p className="text-xl font-bold text-green-600 price-text">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {expandedIndex !== null && (
        <div
          className="overlay"
          onClick={() => setExpandedIndex(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
