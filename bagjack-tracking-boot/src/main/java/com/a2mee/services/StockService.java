package com.a2mee.services;

import java.util.List;

import com.a2mee.model.Stock;

public interface StockService {

	int getProductCount();

	void addAll(List<Stock> stocks);

	List<Stock> getStockByProduct(String productType);

	List<Stock> getStock();

	Stock getStockByQrCode(String qrCode);

	void update(List<Stock> stocks);

	Stock getStockByRetQrCode(String retQrCode);

	Stock getStockBySerial(String serialNo);

}
