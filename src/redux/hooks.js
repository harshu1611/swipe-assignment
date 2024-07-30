import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectProducts } from "./productSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};

export const useProductsData=()=>{
  const productList = useSelector(selectProducts);

  return {productList}
}
