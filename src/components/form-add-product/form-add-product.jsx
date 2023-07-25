import React, { useState } from 'react';
import './form-add-product.css';

function FormAddProduct() {
  const [image, setImage] = useState('');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [priceTaxeIncluse, setPriceTaxeIncluse] = useState('');
  const [priceTaxeExcluse, setPriceTaxeExcluse] = useState('');
  const [quantity, setQuantity] = useState('');
  const [langue, setLangue] = useState('');

  // Fonction pour gérer l'ajout d'un produit
  const handleAddProduct = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('reference', reference);
      formData.append('description', description);
      formData.append('priceTaxeIncluse', priceTaxeIncluse);
      formData.append('priceTaxeExcluse', priceTaxeExcluse);
      formData.append('quantity', quantity);
      formData.append('langue', langue);

      const response = await fetch('https://redcat-test.000webhostapp.com/products/add_product.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du produit');
      }

      // Réinitialiser les champs après l'ajout réussi
      setImage('');
      setReference('');
      setDescription('');
      setPriceTaxeIncluse('');
      setPriceTaxeExcluse('');
      setQuantity('');
      setLangue('');

      // Recharger la page après l'ajout réussi
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-form-add-product">
      <h1>Ajouter un produit</h1>

      <form onSubmit={handleAddProduct} encType="multipart/form-data">
        <div className="form-exemple">
          <label htmlFor="image">Image :</label>
          <input required type="file" accept="image/*" name="image" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="form-exemple">
          <label htmlFor="reference">Réference :</label>
          <input type="text" name="reference" id="reference" value={reference} onChange={(e) => setReference(e.target.value)} />
        </div>
        <div className="form-exemple">
          <label htmlFor="description">Description :</label>
          <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-exemple">
          <label htmlFor="priceTaxeIncluse">Price Taxe Incluse :</label>
          <input type="text" id="priceTaxeIncluse" name="priceTaxeIncluse" value={priceTaxeIncluse} onChange={(e) => setPriceTaxeIncluse(e.target.value)} />
        </div>
        <div className="form-exemple">
          <label htmlFor="priceTaxeExcluse">Price Taxe Excluse :</label>
          <input type="text" id="priceTaxeExcluse" name="priceTaxeExcluse" value={priceTaxeExcluse} onChange={(e) => setPriceTaxeExcluse(e.target.value)} />
        </div>
        <div className="form-exemple">
          <label htmlFor="quantity">Quantity :</label>
          <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="form-exemple">
          <label htmlFor="langue">Language :</label>
          <input type="text" id="langue" name="langue" value={langue} onChange={(e) => setLangue(e.target.value)} />
        </div>
        <div className="form-exemple">
          <input type="submit" value="Add product" id="btnSubmitProduct" name="submitProduct" />
        </div>
      </form>
    </div>
  );
}

export default FormAddProduct;
