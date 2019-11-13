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

	@Override
	public Stock getStockByQrCode(String qrCode) {
		Optional<Stock> stock = stockRepo.getStockByQrCode(qrCode);
		return stock.isPresent()? stock.get() : null;
	}

	@Override
	public void update(List<Stock> stocks) {
		stockRepo.saveAll(stocks);
	}

	@Override
	public Stock getStockByRetQrCode(String retQrCode) {
		Optional<Stock> stock = stockRepo.getStockByRetQrCode(retQrCode);
		return stock.isPresent()? stock.get() : null;
	}

	@Override
	public Stock getStockBySerial(String serialNo) {
		Optional<Stock> stock = stockRepo.getStockBySerial(serialNo);
		return stock.isPresent()? stock.get() : null;
	}

}
