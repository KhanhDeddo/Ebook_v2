import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";

const rows = [
  { id: 1, name: "Sách A", category: "Khoa học" },
  { id: 2, name: "Sách B", category: "Văn học" },
  { id: 3, name: "Sách C", category: "Khoa học" },
];

// Custom filter operator cho cột category
const categoryFilterOperators = [
  {
    label: "Bằng",
    value: "equals",
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) return null;

      return (params) => params.value === filterItem.value;
    },
    InputComponent: (props) => {
      const { item, applyValue } = props;

      return (
        <Select
          value={item.value || ""}
          onChange={(event) => applyValue({ ...item, value: event.target.value })}
          style={{ width: "100%" }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="Khoa học">Khoa học</MenuItem>
          <MenuItem value="Văn học">Văn học</MenuItem>
        </Select>
      );
    },
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Tên Sách", flex: 1 },
  {
    field: "category",
    headerName: "Danh Mục",
    flex: 1,
    filterOperators: categoryFilterOperators, // Áp dụng bộ lọc custom
  },
];

export default function Users() {
  const [filterModel, setFilterModel] = useState({ items: [] });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        filterModel={filterModel}
        onFilterModelChange={(newModel) => setFilterModel(newModel)}
      />
    </div>
  );
}
