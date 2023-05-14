import Sale from "./Sale";
import React from "react";
import { NavLink } from "react-router-dom";
import "./Card.modules.css";

function CardAdmin(props) {
  const item = props.item;

  return (
    <div className="col mb-5">
      <div className="card h-100">
        <Sale sale={item.on_sale} />

        <img className="card-img-top" src={item.image} alt="..." />

        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">
              <b>Name:</b>
              <NavLink to={"/item/" + item.id}>{item.name}</NavLink>
            </h5>
            <b>Category:</b> {item.category}
            <br />
            <b>Price:</b> ${item.price}
            <br />
            <b>Description:</b> {item.description}
          </div>
        </div>

        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <div className="btn-content">
              <button
                className="btn btn-outline-dark mt-auto btn-info"
                onClick={() => props.onEdit(item)}
              >
                <>Edit</>
              </button>
              <button
                className="btn btn-outline-dark mt-auto btn-danger"
                onClick={() => props.onDelete(item)}
              >
                <>Delete</>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardAdmin;
