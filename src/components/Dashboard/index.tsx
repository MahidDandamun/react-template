import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../hooks';
import MixedChartUI from "../ui/MixedChartUI";
import HorizontalBarChartUI from "../ui/HorizontalBarChartUI";
import DataTableUI from "../ui/DataTableUI";
import CardUI from "../ui/CardUI";
import HeaderUI from "../ui/HeaderUI";
import {getSalesThisMonth, getSalesLastMonth} from "../../store/services/DashboardService"

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
    const { prev_month_total_sales, curr_month_total_sales, isLoading } = useAppSelector(
    (state) => state.dashboard
  );
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const payload = {
          year: today.getFullYear(),
          month: today.getMonth() + 1,
          date: today.getDate()
        } 
        document.title = "Dashboard";
        await dispatch(getSalesThisMonth(payload));
        await dispatch(getSalesLastMonth(payload));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const data = [
    {
      THeaders: ["NO.", "ITEM", "PRICE", "STOCKS"],
      TData: [
        {
          column1: "1",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              Item 5
            </a>
          ),
          column3: "PHP 450.00",
          column4: "3,866",
        },
        {
          column1: "2",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              Item 4
            </a>
          ),
          column3: "PHP 450.00",
          column4: "3,866",
        },
        {
          column1: "3",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              Item 2
            </a>
          ),
          column3: "PHP 450.00",
          column4: "3,866",
        },
        {
          column1: "4",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              Item 1
            </a>
          ),
          column3: "PHP 450.00",
          column4: "3,866",
        },
        {
          column1: "5",
          column2: (
            <a href="/uitest" className="underline underline-offset-1">
              Item 3
            </a>
          ),
          column3: "PHP 450.00",
          column4: "3,866",
        },
      ],
    },
  ];
  
  const salesPercentage = (((curr_month_total_sales ?? 0) - (prev_month_total_sales ?? 0)) / (prev_month_total_sales || 1) * 100).toFixed(2);
  
  return (
    <> 
      {!isLoading &&(
        <div className="flex flex-col gap-2 lg:gap-7 min-h-screen">
          <HeaderUI variant="default" title="Dashboard"></HeaderUI>
          <main className="grid grid-cols-3 gap-4 w-full">
            <div className="flex flex-row gap-4 col-span-3 lg:col-span-1 lg:flex-col overflow-x-auto">
              <CardUI
                title="Total stocks"
                value="3,866"
                status="increase"
                period="this month"
                percentage="2.34"
              ></CardUI>
              <CardUI
                title="Incoming stocks"
                value="115,250"
                status="decrease"
                period="this month"
                percentage="2.34"
              ></CardUI>
              <CardUI
                title="Outcoming stocks"
                value="345,789"
                status="increase"
                period="this month"
                percentage="2.34"
              ></CardUI>
              <CardUI
                title="Sales"
                value={"₱ " + String(curr_month_total_sales!== null?curr_month_total_sales:'0')}
                status="increase"
                period="this month"
                percentage={String(salesPercentage)}
              ></CardUI>
            </div>
            <div className="col-span-3 border rounded-lg lg:col-span-2">
              <MixedChartUI></MixedChartUI>
            </div>
            <div className="col-span-3 border rounded-lg lg:col-span-2">
              <HorizontalBarChartUI></HorizontalBarChartUI>
            </div>
            <div className="col-span-3 lg:col-span-1">
              <DataTableUI
                data={data}
                searchable={false}
                cardTitle="Best selling items"
              ></DataTableUI>
            </div>
          </main>
        </div>)
      }
    </>
  );
};

export default Dashboard;
