import React, { useState, useEffect } from 'react';
import "./gallery-product.css"

function GalleryProduct(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
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
  
      fetchProducts();
    }, []);

    return(
        <div className="container-gallery-product">
            <h1>Nos livres :</h1>

            <div className="container-books">
                {products.map((product) => (
                    <div className="container-book" key={product.idProduct}>
                        <img src={`http://localhost:8888/crud-rest/images/${product.image}`} alt="" />
                        <div className="container-info-book">
                            <h3 className='title-book'>{product.reference}</h3>
                            <p className='price'>{product.priceTaxIncl} €</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GalleryProduct