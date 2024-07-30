import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import { useSelector } from "react-redux";
import { selectProducts } from "../redux/productSlice";

const InvoiceItem = (props) => {
  const productList = useSelector(selectProducts);
  const { onItemizedItemEdit, currency, onRowDel, items, onRowAdd,exchangeRate, isEdit } = props;

  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
      productList={productList}
      exchangeRate={exchangeRate}
      isEdit={isEdit}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>DESCRIPTION</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const { item, onDelEvent, onItemizedItemEdit, currency, productList,exchangeRate, isEdit } = props;

  const [selectedItem, setSelectedItem] = useState();

  console.log(item,isEdit)
  const handleSelectChange = (e) => {
    const selected = JSON.parse(e.target.value);
    setSelectedItem(selected);

    
    item.itemId = selected.id;
    item.itemName = selected.name;
    item.itemPrice = selected.price;
    item.itemDescription = selected.description;

   
    onItemizedItemEdit({ target: { name: "itemName", value: selected.name } }, item.itemId);
    onItemizedItemEdit({ target: { name: "itemPrice", value: selected.price } }, item.itemId);
    onItemizedItemEdit({ target: { name: "itemDescription", value: selected.description } }, item.itemId);
  };

  return (
    <tr>
      <td style={{ width: "auto", height:'100%'}}>
        <select onChange={handleSelectChange} value={selectedItem && selectedItem.itemName} defaultValue={isEdit ? item : ""} style={{borderRadius:6, width:'auto', backgroundColor:'#f5f7f9', borderWidth:0, padding:2, justifyItems:'center', alignContent:'center',height:'100%'}}>
          {isEdit ?
          <option value={item}>{item.itemName}</option>
          :
          <option value="">Select an item</option>
        }
          {productList.map((product) => (
            <option key={product.id} value={JSON.stringify(product)}>
              {product.name}
            </option>
          ))}
        </select>
      </td>
      <td style={{ minWidth: "70%", height:'auto' }}>
        <EditableField
          onItemizedItemEdit={(evt) => onItemizedItemEdit(evt, item.itemId)}
          cellData={{
            type: "text",
            name: "itemDescription",
            min: 1,
            step: "1",
            value: item.itemDescription,
            id: item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={(evt) => onItemizedItemEdit(evt, item.itemId)}
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: item.itemQuantity,
            id: item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        {JSON.parse(currency).sign}{(item.itemPrice * exchangeRate).toFixed(2)}
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={() => onDelEvent(item)}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
