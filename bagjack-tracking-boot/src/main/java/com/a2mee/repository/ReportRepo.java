package com.a2mee.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.a2mee.model.Stock;

@Repository
public interface ReportRepo extends JpaRepository<Stock, Integer>{

	@Query("from Stock s where s.stockDate=?1")
	List<Stock> getTodaysStock(Date searchDate);

	@Query("from Stock s where s.stockDate BETWEEN ?1 AND ?2")
	List<Stock> getTodaysStock(Date from, Date to);

	@Query("from Stock s where s.saleDate=?1 and s.isSold!='N'")
	List<Stock> getTodaysSales(Date searchDate);

	@Query("from Stock s where s.isSold!='N' and s.saleDate BETWEEN ?1 AND ?2")
	List<Stock> getSalesByDateRange(Date from, Date to);

	@Query("from Stock s where s.returnDate=?1 and s.isSold='R'")
	List<Stock> getTodaysReturn(Date searchDate);

	@Query("from Stock s where s.isSold='R' and s.returnDate BETWEEN ?1 AND ?2")
	List<Stock> getReturnByDateRange(Date from, Date to);

}
