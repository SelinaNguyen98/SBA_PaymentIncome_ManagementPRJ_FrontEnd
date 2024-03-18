// Import thư viện axios
import axios from "axios";
/////
/////
// Thiết lập URL cơ sở cho tất cả các yêu cầu API
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

// Định nghĩa các đường dẫn API trong ứng dụng
export const paths = {
  LOGIN: "auth/login",  // Đăng nhập
  GET_PAYMENTS_MONTH_YEAR: "payments",  // Lấy thông tin thanh toán theo tháng và năm
  PAYMENT: "payments",  // Thực hiện các thao tác liên quan đến thanh toán
  EXCHAGE_RATE: "exchangeRate",  // Tỷ giá hối đoái
  PL_REPORT: "getDataPL",  // Báo cáo lợi nhuận và lỗ
  GROUP: "groups",  // Nhóm
  CATEGORY: "categories",  // Danh mục
  CATEGORY_ALL: "categories/all",  // Tất cả danh mục
  GET_ORDER_MONTH_YEAR: "orders",  // Lấy đơn hàng theo tháng và năm
  DELETE_ORDER: "orders",  // Xóa đơn hàng
  CREATE_ORDER: "orders",  // Tạo mới đơn hàng
  UPDATE_ORDER: "orders",  // Cập nhật đơn hàng
  categoriesPL: "categories",  // Danh mục cho báo cáo lợi nhuận và lỗ
  ANALYTICS: "analytics",  // Phân tích dữ liệu
  PAYMENT_ORDERS: "payment_orders",  // Thanh toán cho đơn hàng
  GROUPCATEGORY: "groups",  // Nhóm danh mục
  OUTSOURCING: "outsourcing",  // Dịch vụ thuê ngoại vi
  EXPORT_PL: "Export/PL",  // Xuất báo cáo lợi nhuận và lỗ
};

// Intercepter yêu cầu để gắn token xác thực vào mỗi yêu cầu
axios.interceptors.request.use((config) => {
  // Lấy token từ local storage
  const authToken = localStorage.getItem("token");

  // Nếu tồn tại token, thêm vào tiêu đề yêu cầu để xác thực
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  // Trả về cấu hình đã được thay đổi
  return config;
});
