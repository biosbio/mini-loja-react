import React from 'react';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">FakeStore Produtos</h1>
      <ProductList />
    </div>
  );
}

export default App;
