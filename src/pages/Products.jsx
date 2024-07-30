import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  selectProducts,
  updateProduct,
} from "../redux/productSlice";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import { BiSolidPencil, BiTrash, BiArrowBack } from "react-icons/bi";
import { Modal, Table } from "react-bootstrap";
import "../App.css";
import { Alert } from "bootstrap";

export default function Products() {
  const navigate = useNavigate();
  // const history= useHistory()
  const dispatch = useDispatch();
  const productList = useSelector(selectProducts);
  const [open, setOpen] = useState(false);
  const [addProductForm, setAddProductForm] = useState({
    name: "",
    price: "",
    id: Math.floor(Math.random() * 100),
    description: "",
  });

  const [edit, setEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: 0,
    id: "",
    description: "",
  });

  useEffect(() => {
    setEditForm({
      name: edit ? edit.name : "",
      price: edit ? edit.price : 0,
      id: edit ? edit.id : "",
      description: edit ? edit.description : "",
    });
  }, [edit]);
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const checkProductId = (new_id) => {
    const index = productList.findIndex((product) => product.id == new_id);

    return index;
  };


  return (
    <div style={{ width: "100%", height: "100%", padding:20}}>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'center'}}>
        
        <div className="fw-bold mt-1 mx-2 cursor-pointer" style={{position:'absolute', top:10, left:50, display:'flex', flexDirection:'row'}}>
          <button onClick={()=>navigate(-1)} style={{borderWidth:0}}>
          <BiArrowBack size={18} />
            <h5>Go Back</h5>
          </button>
        </div>
        <h1 style={{textAlign:'center', alignSelf:'center'}}>Products</h1>
        </div>
      
      <Button
        variant="primary"
        className="d-block w-30"
        onClick={() => setOpen(!open)}
      >
        Add Product
      </Button>
      <Modal
        show={open}
        onHide={() => {
          setOpen(false);
        }}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{"Add product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              value={addProductForm.name}
              onChange={(e) => {
                e.preventDefault();
                setAddProductForm({
                  ...addProductForm,
                  name: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter Product Name"
            ></input>
            <input
              value={addProductForm.price}
              onChange={(e) => {
                e.preventDefault();
                setAddProductForm({
                  ...addProductForm,
                  price: e.target.value,
                });
              }}
              type="number"
              placeholder="Enter Product Price (USD)"
            ></input>
            <input
              value={addProductForm.description}
              onChange={(e) => {
                e.preventDefault();
                setAddProductForm({
                  ...addProductForm,
                  description: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter Product Description"
            ></input>
            <input
              value={addProductForm.id}
              onChange={(e) => {
                e.preventDefault();
                setAddProductForm({
                  ...addProductForm,
                  id: e.target.value,
                });
              }}
              type="number"
              placeholder="Enter Product Id"
            ></input>

            <Button
              variant="primary"
              className="d-block w-30"
              onClick={() => {
                if (checkProductId(addProductForm.id) === -1) {
                  dispatch(addProduct(addProductForm));

                  setAddProductForm({
                    name: "",
                    price: "",
                    id: Math.floor(Math.random() * 100),
                    description: "",
                  });
                  alert("Product Added");
                  setOpen(false);
                } else {
                  alert("Product Id already Exists! Please change Id");
                }
              }}
            >
              {"Add Product"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={edit ? true : false}
        onHide={() => {
          setEdit(null);
        }}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{"Edit product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              value={editForm.name}
              onChange={(e) => {
                e.preventDefault();
                setEditForm({
                  ...editForm,
                  name: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter Product Name"
            ></input>
            <input
              value={editForm.price}
              onChange={(e) => {
                e.preventDefault();
                setEditForm({
                  ...editForm,
                  price: e.target.value,
                });
              }}
              type="number"
              placeholder="Enter Product Price (USD)"
            ></input>
            <input
              value={editForm.description}
              onChange={(e) => {
                e.preventDefault();
                setAddProductForm({
                  ...editForm,
                  description: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter Product Id"
            ></input>
            <input
              value={editForm.id}
              onChange={(e) => {
                e.preventDefault();
                setEditForm({
                  ...editForm,
                  id: e.target.value,
                });
              }}
              disabled={true}
              type="number"
              placeholder="Enter Product Id"
            ></input>

            <Button
              variant="primary"
              className="d-block w-30"
              onClick={() => {
                dispatch(updateProduct(editForm));
                setEdit(null);
                alert("Product Updated");
              }}
            >
              {"Update Product"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {productList && productList.length !== 0 ? (
        <div style={{ backgroundColor: "white", height: "80%", width: "70%", marginTop:20, padding:10 }}>
          <Table responsive>
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item.id}</td>
                      <td className="fw-normal">{item.name}</td>
                      <td className="fw-normal">${item.price}</td>
                      <td className="fw-normal">{item.description}</td>
                      <td style={{ width: "5%" }}>
                        <Button
                          variant="outline-primary"
                          onClick={() => {
                            setEdit(item);
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <BiSolidPencil />
                          </div>
                        </Button>
                      </td>
                      <td style={{ width: "5%" }}>
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleDeleteProduct(item.id);
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <BiTrash />
                          </div>
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <h1>No Products to display</h1>
      )}
    </div>
  );
}
