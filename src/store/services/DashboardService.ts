import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getSalesThisMonth = createAsyncThunk(
  'dashboard/getSalesThisMonth',
  async ({ year, month, date }: { year: number, month: number, date: number }, { rejectWithValue }) => {
    try {
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDate = date < 10 ? `0${date}` : date;
      const response = await api.get(
        "resource/Sales Order",
        {
          params: {
            fields: JSON.stringify(["sum(base_grand_total) as total_sales"]),
            filters: JSON.stringify([
              ["transaction_date", "between", [`${year}-${formattedMonth}-01`, `${year}-${formattedMonth}-${formattedDate}`]],
              ["status", "=", "completed"]
            ])
          }
        }
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getSalesLastMonth = createAsyncThunk(
  'dashboard/getSalesLastMonth',
  async ({ year, month, date }: { year: number, month: number, date:number }, { rejectWithValue }) => {
    try {
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      const formattedMonth = prevMonth < 10 ? `0${prevMonth}` : prevMonth;
      const formattedDate = date < 10 ? `0${date}` : date;
      const response = await api.get("resource/Sales Order", {
        params: {
          fields: JSON.stringify(["sum(base_grand_total) as total_sales"]),
          filters: JSON.stringify([
            ["transaction_date", "between", [`${prevYear}-${formattedMonth}-01`, `${prevYear}-${formattedMonth}-${formattedDate}`]],
            ["status", "=", "completed"]
          ])
        }
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);



export const getStocksThisMonth = createAsyncThunk(
  'dashboard/getStocksThisMonth',
  async ({ year, month, date }: { year: number, month: number, date: number }, { rejectWithValue }) => {
    try {
      const formattedMonth = month < 10 ? `0${month}` : month.toString();
      const formattedDate = date < 10 ? `0${date}` : date.toString();
      const response = await api.get(
        "resource/Sales Order",
        {
          params: {
            fields: JSON.stringify(["sum(base_grand_total) as total_sales"]),
            filters: JSON.stringify([
              ["creation", "between", [`${year}-${formattedMonth}-01`, `${year}-${formattedMonth}-${formattedDate}`]],
              ["status", "=", "completed"]
            ])
          }
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
