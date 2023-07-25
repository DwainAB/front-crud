import React, { useState, useEffect } from 'react';
import './List-product-admin.css';

function ListProductAdmin() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedReference, setUpdatedReference] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedPriceTaxeIncluse, setUpdatedPriceTaxeIncluse] = useState('');
  const [updatedPriceTaxeExcluse, setUpdatedPriceTaxeExcluse] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://redcat-test.000webhostapp.com/products/get_all_product.php');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits');
      }
      const data = await response.json();
      let productInfo = data.product;
      setProducts(productInfo);
      console.log(productInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setUpdatedReference(product.reference);
    setUpdatedDescription(product.description);
    setUpdatedPriceTaxeIncluse(product.priceTaxIncl);
    setUpdatedPriceTaxeExcluse(product.priceTaxExcl);
  };

  const handleDeleteProduct = async (idProduct) => {
    try {
      const response = await fetch(`https://redcat-test.000webhostapp.com/products/delete_product.php?id=${idProduct}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du produit');
      }

      // Filtrer le produit supprimé de la liste des produits affichée à l'écran
      setProducts((prevProducts) => prevProducts.filter((product) => product.idProduct !== idProduct));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Sortir du mode d'édition sans sauvegarder les modifications
  };

  return (
    <div className="container-list-products">
      <div className="header-list-product">
        <p>référence</p>
        <p>Description</p>
        <p>Prix TTC</p>
        <p>Prix sans Taxe</p>
        <p></p>
        <p></p>
      </div>
      {products.map((product) => (
        <div className="container-book-admin" key={product.idProduct}>
          <div className="container-info-book-admin">
            <p className='title-book'>{product.reference}</p>
            <p className='description-book'>{product.description}</p>
            <p className='priceTaxIncl'>{product.priceTaxIncl} €</p>
            <p className='priceTaxExcl'>{product.priceTaxExcl} €</p>
            <button className='btnAction' onClick={() => handleEditProduct(product)}>Modifier</button>
            <button className='btnAction' onClick={() => handleDeleteProduct(product.idProduct)}>Supprimer</button>
          </div>
        </div>
      ))}

      {/* Afficher le formulaire de modification si en mode édition */}
      {isEditing && currentProduct && (
        <div className="edit-product-form">
          <h2>Modifier le produit</h2>
          <form action={`https://redcat-test.000webhostapp.com/products/update_product.php?id=${currentProduct.idProduct}`} method='POST'>
            <div className="form-exemple">
              <label htmlFor="updatedReference">Référence :</label>
              <input type="text" name="updatedReference" value={updatedReference} onChange={(e) => setUpdatedReference(e.target.value)} />
            </div>
            <div className="form-exemple">
              <label htmlFor="updatedDescription">Description :</label>
              <input type="text" name="updatedDescription" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
            </div>
            <div className="form-exemple">
              <label htmlFor="updatedPriceTaxeIncluse">Price Taxe Incluse :</label>
              <input type="text" name="updatedPriceTaxeIncluse" value={updatedPriceTaxeIncluse} onChange={(e) => setUpdatedPriceTaxeIncluse(e.target.value)} />
            </div>
            <div className="form-exemple">
              <label htmlFor="updatedPriceTaxeExcluse">Price Taxe Excluse :</label>
              <input type="text" name="updatedPriceTaxeExcluse" value={updatedPriceTaxeExcluse} onChange={(e) => setUpdatedPriceTaxeExcluse(e.target.value)} />
            </div>
            <div className="btnsUpdate">
              <button className='btnUpdate' type="submit">Enregistrer</button>
              <button className='btnUpdate' type="button" onClick={handleCancelEdit}>Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ListProductAdmin;
