package com.a2mee.services.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2mee.model.Stock;
import com.a2mee.repository.ReportRepo;
import com.a2mee.services.ReportServices;
import com.a2mee.util.CustomLogger;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ReportServicesImpl implements ReportServices {

	@Autowired
	ReportRepo reportRepo;

	@Override
	public List<Stock> getTodaysStock(Date searchDate) {
		return reportRepo.getTodaysStock(searchDate);
	}

	@Override
	public List<Stock> getStockByDateRange(Date from, Date to) {
		return reportRepo.getTodaysStock(from, to);
	}

	@Override
	public List<Stock> getTodaysSales(Date searchDate) {
		return reportRepo.getTodaysSales(searchDate);
	}

	@Override
	public List<Stock> getSalesByDateRange(Date from, Date to) {
		return reportRepo.getSalesByDateRange(from, to);
	}

	@Override
	public List<Stock> getTodaysReturn(Date searchDate) {
		return reportRepo.getTodaysReturn(searchDate);
	}

	@Override
	public List<Stock> getReturnByDateRange(Date from, Date to) {
		return reportRepo.getReturnByDateRange(from, to);
	}

	
}
