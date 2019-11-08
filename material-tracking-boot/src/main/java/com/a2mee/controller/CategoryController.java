package com.a2mee.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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

import com.a2mee.util.API;

@RestController
@RequestMapping(API.category)
@CrossOrigin("*")
public class CategoryController {

	/* for Desktop Screen */
	public final Logger logger = LoggerFactory.getLogger(this.getClass());

	/* for uploading Model Plan */
	@PostMapping(API.uploadCategories)
	public @ResponseBody ResponseEntity postFile(ModelMap model, @ModelAttribute(value = "file") MultipartFile file,
			HttpServletRequest request) {
		try {
			if (!(file == null)) {
				if (file.isEmpty()) {
					logger.info("File not found");
				} else {
					logger.info(file.getOriginalFilename());
					try {
						File dir = new File(System.getProperty("catalina.base"), "uploads");
						File uplaodedFile = new File(dir + file.getOriginalFilename());
						file.transferTo(uplaodedFile);
						FileInputStream excelFile = new FileInputStream(uplaodedFile);
						logger.info("hiiii@" + excelFile);
						Workbook workbook = new XSSFWorkbook(excelFile);
						Sheet datatypeSheet = workbook.getSheetAt(0); // contains model plan
						DataFormatter formatter = new DataFormatter();

						int i = 1;
						while (i <= datatypeSheet.getLastRowNum()) { // for saving model plan

							XSSFRow row = null;
							row = (XSSFRow) datatypeSheet.getRow(i++);

							if (row.getCell(0) != null) {
								String modelCode = formatter.formatCellValue(row.getCell(0));
								double qty = Double.parseDouble(formatter.formatCellValue(row.getCell(1)));								
								String month = formatter.formatCellValue(row.getCell(2));
								
								if(month.length()>3) month = month.substring(0,3).toUpperCase();
								else month = month.toUpperCase();
		
								String year = formatter.formatCellValue(row.getCell(3));
								
//								ModelPlan modelPlan = modelService.getModelPlanByFields(modelCode, month, year);
								
//								if(modelPlan == null) {
//									ModelPlan theModelPlan = new ModelPlan();
//									theModelPlan.setModelCode(modelCode);
//									theModelPlan.setMonth(month);
//									theModelPlan.setQty(qty);
//									theModelPlan.setYear(year);
//									modelPlan = modelService.addModelPlan(theModelPlan);
								}
//							}
						}

						logger.info("Successfully imported modelplan");
						workbook.close();
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					}
				}
			}
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
		
}
