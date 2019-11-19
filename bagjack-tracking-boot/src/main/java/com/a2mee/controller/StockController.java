package com.a2mee.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a2mee.model.Stock;
import com.a2mee.services.StockService;
import com.a2mee.util.API;

@RestController
@RequestMapping(API.stock)
@CrossOrigin("*")
public class StockController {

	/* for Desktop Screen */
	public final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private StockService stockService;

	/* for getting last count of printing */
	@GetMapping(API.getProductCount)
	public @ResponseBody ResponseEntity<Integer> getProductCount() {
		try {
			return new ResponseEntity<Integer>(stockService.getProductCount(), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/* for adding stock */
	@PostMapping(API.addStock)
	public @ResponseBody ResponseEntity addStock(@RequestBody List<Stock> stocks) {
		try {
			stockService.addAll(stocks);
			return new ResponseEntity(HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/* for getting stock by product type */
	@GetMapping(API.getStockByProduct)
	public @ResponseBody ResponseEntity<List<Stock>> getStockByProduct(@RequestParam String productType) {
		try {
			return new ResponseEntity<List<Stock>>(stockService.getStockByProduct(productType), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/* for getting entire stock */
	@GetMapping(API.getStock)
	public @ResponseBody ResponseEntity<List<Stock>> getStock() {
		try {
			return new ResponseEntity<List<Stock>>(stockService.getStock(), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/* for getting stock by qrCode */
	@GetMapping(API.getStockByQrCode)
	public @ResponseBody ResponseEntity<Stock> getStockByQrCode(@RequestParam String qrCode){
		try {
			return new ResponseEntity<Stock>(stockService.getStockByQrCode(qrCode), HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/* for getting stock by qrCode */
	@GetMapping(API.getStockByOrderNo)
	public @ResponseBody ResponseEntity<List<Stock>> getStockByOrderNo(@RequestParam String orderNo){
		try {
			return new ResponseEntity<List<Stock>>(stockService.getStockByOrderNo(orderNo), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/* for selling items */
	@PostMapping(API.sellItems)
	public @ResponseBody ResponseEntity sellItems(@RequestBody List<Stock> stocks){
		try {
			stocks.forEach(s->s.setIsSold("S"));
			stockService.update(stocks);
			return new ResponseEntity(HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/* for getting stock by return qrCode */
	@GetMapping(API.getStockByRetQrCode)
	public @ResponseBody ResponseEntity<Stock> getStockByRetQrCode(@RequestParam String retQrCode){
		try {
			return new ResponseEntity<Stock>(stockService.getStockByRetQrCode(retQrCode), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/* for restocking returned items */
	@PostMapping(API.reStockItems)
	public @ResponseBody ResponseEntity reStockItems(@RequestBody List<Stock> stocks){
		try {
			stocks.forEach(s->s.setIsSold("R"));
			stockService.update(stocks);
			return new ResponseEntity(HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
