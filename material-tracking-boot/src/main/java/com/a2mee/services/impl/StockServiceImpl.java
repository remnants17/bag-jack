package com.a2mee.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2mee.model.Stock;
import com.a2mee.repository.StockRepo;
import com.a2mee.services.StockService;

@Service
public class StockServiceImpl implements StockService {
	
	@Autowired
	StockRepo stockRepo;

	@Override
	public int getProductCount() {
		Optional<Integer> count = stockRepo.getProductCount();
		return count.isPresent()? count.get() : 0;
	}

	@Override
	public void addAll(List<Stock> stocks) {
		stockRepo.saveAll(stocks);
	}

	@Override
	public List<Stock> getStockByProduct(String productType) {
		return stockRepo.getStockByProduct(productType);
	}

	@Override
	public List<Stock> getStock() {
		return stockRepo.getStock();
	}

}
