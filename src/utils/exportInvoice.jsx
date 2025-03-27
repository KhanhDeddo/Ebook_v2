import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Roboto from "../../public/fonts/Roboto.js";

const exportInvoice = (order) => {
  const doc = new jsPDF();

  // Đăng ký font Roboto
  doc.addFileToVFS("Roboto-Regular.ttf", Roboto);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto", "normal"); // Đảm bảo dùng đúng font

  // Thêm font
  doc.addFileToVFS("Roboto-Regular.ttf", Roboto);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");

  // Tên cửa hàng góc trên trái
  doc.setFontSize(20);
  doc.text("Ebook store", 14, 15);

  // Tiêu đề hóa đơn căn giữa
  doc.setFontSize(16);
  const pageWidth = doc.internal.pageSize.width;
  const titleWidth = doc.getTextWidth("HÓA ĐƠN MUA HÀNG");
  doc.text("HÓA ĐƠN MUA HÀNG", (pageWidth - titleWidth) / 2, 30);

  doc.setFontSize(12);
  doc.text(`Mã đơn hàng: ${order.order_id}`, 14, 40);
  doc.text(`Tên khách hàng: ${order.name}`, 14, 50);
  doc.text(`Số điện thoại: ${order.phone}`, 14, 60);
  doc.text(`Địa chỉ: ${order.address}`, 14, 70);
  doc.text(`Phương thức thanh toán: ${order.payment_method}`, 14, 80);
  doc.text(`Trạng thái: ${order.payment_status}`, 14, 90);

  // Dữ liệu bảng sản phẩm
  const tableColumn = ["Sản phẩm", "Số lượng", "Đơn giá"];
  const tableRows = order.OrderItems?.map((item) => [
    item.product_name,
    item.quantity,
    `${item.price} VND`,
  ]) || [];

  // 🔥 Chỉnh lại font cho bảng
  autoTable(doc, {
    startY: 120,
    head: [tableColumn],
    body: tableRows,
    styles: {
      font: "Roboto",
      fontStyle: "normal", // 🔥 Bắt buộc để không lỗi font
    },
  });

  // Kiểm tra vị trí kết thúc bảng
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 100;

  // Tổng tiền
  doc.text(`Tổng tiền: ${order.final_price} VND`, 14, finalY);

  // Lưu file PDF
  doc.save(`hoa-don-${order.order_id}.pdf`);
};

export default exportInvoice;
