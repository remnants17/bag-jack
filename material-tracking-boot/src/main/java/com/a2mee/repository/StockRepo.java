package com.a2mee.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.a2mee.model.Stock;

@Repository
public interface StockRepo extends JpaRepository<Stock, Integer> {	
	
	@Query("SELECT MAX(s.productCount) FROM Stock s")
	Optional<Integer> getProductCount();

	List<Stock> findAllByProductType(String productType);

	@Query("FROM Stock s where s.productType=?1 AND s.isSold=0")
	List<Stock> getStockByProduct(String productType);

	@Query("FROM Stock s where s.isSold=0")
	List<Stock> getStock();

}
