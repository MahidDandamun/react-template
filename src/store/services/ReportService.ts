import api from "../../api/api";
export const getStockLedger = async (company: string) => {
  try {
    const response = await api.get(
      `method/frappe.desk.query_report.run?report_name=Stock%20Ledger&filters=%7B%22company%22%3A%22${company}%22%2C%22from_date%22%3A%222024-06-24%22%2C%22to_date%22%3A%222024-12-30%22%2C%22valuation_field_type%22%3A%22Currency%22%7D&ignore_prepared_report=false&are_default_filters=true&_=1721830212858`
    );
    return response.data.message.result;
  } catch (error) {
    console.error("Error fetching Stock Ledger", error);
  }
};

export const getStockSummary = async () => {
  try {
    const response = await api.get(
      "method/erpnext.stock.dashboard.item_dashboard.get_data"
    );
    return response.data.message;
  } catch (error) {
    console.error("Error fetching Stock Ledger", error);
  }
};
