import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import Products from "./pages/Products";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts } from "./redux/productSlice";
import { selectInvoiceList } from "./redux/invoicesSlice";
import { updateInvoice } from "./redux/invoicesSlice";
import { useProductsData } from "./redux/hooks";

const App = () => {
  const dispatch = useDispatch();
  // const selector=useSelector()
  // const [productList,setProductList]= useState(useSelector(selectProducts))
  
  const invoiceList = useSelector(selectInvoiceList);
  const {productList}= useProductsData()

 
  const updateAllInvoices = () => {
    if (invoiceList.length !== 0) {
      invoiceList.map((invoice) => {
        let subTotal=0
        const updatedItems = invoice.items.map((item) => {
          const updatedProduct = productList.find(
            (product) => product.id===item.itemId
          );
          subTotal +=
          parseFloat(updatedProduct.price).toFixed(2) * parseInt(item.itemQuantity) * invoice.exchangeRate;
          console.log(updatedProduct)
          return updatedProduct ? {...item, itemDescription: updatedProduct.description, itemId: updatedProduct.id,itemName: updatedProduct.name, itemPrice: updatedProduct.price } : item;
        });

        const taxAmount = parseFloat(
          subTotal * (invoice.taxRate / 100)
        ).toFixed(2);
        const discountAmount = parseFloat(
          subTotal * (invoice.discountRate / 100)
        ).toFixed(2);

        const total = (
          subTotal -
          parseFloat(discountAmount) +
          parseFloat(taxAmount)
        ).toFixed(2);

        dispatch(
          updateInvoice({
            id: invoice.id,
            updatedInvoice: { ...invoice, items: updatedItems, subTotal:subTotal, total:total },
          })
        );
        return null;
      });
    }
  };

  useEffect(() => {
    // setProductList(selector(selectProducts))
    updateAllInvoices();
   
  }, [productList]);
  return (
    <div className="">
      <Container>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<Invoice />} />
          <Route path="/create/:id" element={<Invoice />} />
          <Route path="/edit/:id" element={<Invoice />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
