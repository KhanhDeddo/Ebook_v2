import exportInvoice from "~/utils/exportInvoice";


const BtnExport = ({ order }) => {
  return <button onClick={() => exportInvoice(order)}>Xuất hóa đơn</button>;
};

export default BtnExport;
