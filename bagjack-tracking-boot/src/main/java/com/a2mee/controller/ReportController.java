package com.a2mee.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.a2mee.model.Stock;
import com.a2mee.services.ReportServices;
import com.a2mee.util.API;

@RestController
@CrossOrigin
@RequestMapping("report")
public class ReportController {

	@Autowired
	ReportServices reportServices;
	
	private String dateFmt = "yyyy-MM-dd";
	
	@GetMapping(API.todaysStock)
	public List<Stock> getTodaysStock(@RequestParam String date) {
		try {
			Date searchDate=new SimpleDateFormat(dateFmt).parse(date);
			return reportServices.getTodaysStock(searchDate);
		}catch(Exception e) {
//			e.printStackTrace();
			return null;
		}
	}
	
	@GetMapping(API.stockByDateRange)
	public List<Stock> getStockByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
		try {
			Date from = new SimpleDateFormat(dateFmt).parse(startDate);
			Date to = new SimpleDateFormat(dateFmt).parse(endDate);
			return reportServices.getStockByDateRange(from, to);
		}catch(Exception e) {
//			e.printStackTrace();
			return null;
		}
	}
	
	@GetMapping(API.todaysSales)
	public List<Stock> getTodaysSales(@RequestParam String date) {
		try {
			Date searchDate=new SimpleDateFormat(dateFmt).parse(date);
			return reportServices.getTodaysSales(searchDate);
		}catch(Exception e) {
//			e.printStackTrace();
			return null;
		}
	}
	
	@GetMapping(API.salesByDateRange)
	public List<Stock> getSalesByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
		try {
			Date from = new SimpleDateFormat(dateFmt).parse(startDate);
			Date to = new SimpleDateFormat(dateFmt).parse(endDate);
			return reportServices.getSalesByDateRange(from, to);
		}catch(Exception e) {
//			e.printStackTrace();
			return null;
		}
	}
	
	@GetMapping(API.todaysReturn)
	public List<Stock> getTodaysReturn(@RequestParam String date) {
		try {
			Date searchDate=new SimpleDateFormat(dateFmt).parse(date);
			return reportServices.getTodaysReturn(searchDate);
		}catch(Exception e) {
//			e.printStackTrace();
			return null;
		}
	}
	
	@GetMapping(API.returnByDateRange)
	public List<Stock> getReturnByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
		try {
			Date from = new SimpleDateFormat(dateFmt).parse(startDate);
			Date to = new SimpleDateFormat(dateFmt).parse(endDate);
			return reportServices.getReturnByDateRange(from, to);
		}catch(Exception e) {
//			e.printStackTrace();
			return null;
		}
	}
}
