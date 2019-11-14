package com.a2mee.services;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.a2mee.model.Stock;

public interface ReportServices {

	public List<Stock> getTodaysStock(Date searchDate);

	public List<Stock> getStockByDateRange(Date from, Date to);

	public List<Stock> getTodaysSales(Date searchDate);

	public List<Stock> getSalesByDateRange(Date from, Date to);

	public List<Stock> getTodaysReturn(Date searchDate);

	public List<Stock> getReturnByDateRange(Date from, Date to);
}
 