import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Roboto from "../../public/fonts/Roboto.js";

const exportInvoice = (order) => {
  const doc = new jsPDF();

  // Đăng ký font Roboto
  doc.addFileToVFS("Roboto-Regular.ttf", Roboto);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto", "normal")


  doc.addFileToVFS("Roboto-Regular.ttf", Roboto);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");


  doc.setFontSize(20);
  doc.text("Ebook store", 14, 15);


  doc.setFontSize(16);
  const pageWidth = doc.internal.pageSize.width;
  const titleWidth = doc.getTextWidth("HÓA ĐƠN MUA HÀNG");
  doc.text("HÓA ĐƠN MUA HÀNG", (pageWidth - titleWidth) / 2, 30);

  doc.setFontSize(12);
  doc.text(`Mã đơn hàng: ${order.order_id}`, 14, 40);
  doc.text(`Người đặt hàng: ${order?.User?.username}`, 14, 50);
  doc.text(`Người nhận hàng: ${order.name}`, 14, 60);
  doc.text(`Số điện thoại: ${order.phone}`, 14, 70);
  doc.text(`Địa chỉ: ${order.address}`, 14, 80);
  doc.text(`Phương thức thanh toán: ${order.payment_method}`, 14, 90);
  doc.text(`Trạng thái: ${order.payment_status}`, 14, 100);


  const tableColumn = ["Sản phẩm", "Số lượng", "Đơn giá"];
  const tableRows = order.OrderItems?.map((item) => [
    item?.Book?.title,
    item?.quantity,
    `${item?.total_price?.toLocaleString('vi-VN')}đ`,
  ]) || [];
  autoTable(doc, {
    startY: 110,
    head: [tableColumn],
    body: tableRows,
    styles: {
      font: "Roboto",
      fontStyle: "normal",
    },
  });
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 100;
  doc.text(`Tổng tiền: ${order?.total_price.toLocaleString('vi-VN')}đ`, 14, finalY);
  doc.save(`hoa-don-${order.order_id}.pdf`);
};

export default exportInvoice;
