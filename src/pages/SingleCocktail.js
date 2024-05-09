import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  const fetchById = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}${id}`);
      const { drinks } = await response.json();
     
      if (drinks) {
        setCocktail(drinks);
        setLoading(false);
      } else {
        setCocktail(null);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchById();
  }, [id]);

  if(loading){
    return <Loading/>
  }

  if(!cocktail){
    return <h2 className="section-title">No cocktail to display</h2>
  }

  return (
   
    <section className="section cocktail-section">
      <NavLink className="btn btn-primary" to ="/">
        back home
      </NavLink>
      <h2 className="section-title">{cocktail[0].strDrink}</h2>
      <div className="drink">
        <img src={cocktail[0].strDrinkThumb} alt={cocktail[0].strGlass} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span> {cocktail[0].strDrink}
          </p>
          <p>
            <span className="drink-data">category :</span>{" "}
            {cocktail[0].strCategory}
          </p>
          <p>
            <span className="drink-data">info :</span> {cocktail[0].strAlcoholic}
          </p>
          <p>
            <span className="drink-data">glass :</span> {cocktail[0].strGlass}
          </p>
          <p>
            <span className="drink-data">instructons :</span>
            {cocktail[0].strInstructions}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
