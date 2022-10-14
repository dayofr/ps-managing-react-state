import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail(props) {
  const [sku, setSku] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, error, loading } = useFetch(`products/${id}`);

  if (!product) return <PageNotFound />;
  if (error) throw error;
  if (loading) return <Spinner />;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select id="sku" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>

      <p>
        <button
          disabled={sku === ""}
          className="btn btn-primary"
          onClick={() => {
            props.addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </p>

      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
