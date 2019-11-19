package com.a2mee.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
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

import com.a2mee.model.CategoriesMst;
import com.a2mee.services.CategoriesService;
import com.a2mee.util.API;

@RestController
@RequestMapping(API.category)
@CrossOrigin("*")
public class CategoryController {

	/* for Desktop Screen */
	public final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private CategoriesService categoriesService;

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
//						logger.info("hiiii@" + excelFile);
						Workbook workbook = new XSSFWorkbook(excelFile);
						DataFormatter formatter = new DataFormatter();
						List<CategoriesMst> categories = new ArrayList<>();

						Sheet FCSheet = workbook.getSheetAt(0); // contains FC
						int i = 1;
						while (i <= FCSheet.getLastRowNum()) { // for adding FC							
							XSSFRow row = null;
							row = (XSSFRow) FCSheet.getRow(i++);

							if (row.getCell(0) != null) {
								String productType = "FC";
								String modelCode = formatter.formatCellValue(row.getCell(1));
								String modelType = formatter.formatCellValue(row.getCell(2));
								String artist = formatter.formatCellValue(row.getCell(3));
								String color = formatter.formatCellValue(row.getCell(4));
								CategoriesMst category = categoriesService.getFC(productType, modelCode+"-"+modelType, artist, color);
								if(category==null) {
									CategoriesMst theCategory = new CategoriesMst();
									theCategory.setProductType(productType);
									theCategory.setModelCode(modelCode + "-" + modelType);
									theCategory.setArtist(artist);
									theCategory.setColor(color);
									categories.add(theCategory);
								}								
							}
						}
						
						
						Sheet JacketSheet = workbook.getSheetAt(1); // contains Jackets
						i = 1;
						while (i <= JacketSheet.getLastRowNum()) { // for adding Jackets							
							XSSFRow row = null;
							row = (XSSFRow) JacketSheet.getRow(i++);

							if (row.getCell(0) != null) {
								String productType = "Jacket";
								String artist = formatter.formatCellValue(row.getCell(1));
								String size = formatter.formatCellValue(row.getCell(2));
								String color = formatter.formatCellValue(row.getCell(3));
								String gender = formatter.formatCellValue(row.getCell(4));
								CategoriesMst category = categoriesService.getJacket(productType, artist, size, color, gender);
								if(category==null) {
									CategoriesMst theCategory = new CategoriesMst();
									theCategory.setProductType(productType);
									theCategory.setArtist(artist);
									theCategory.setSize(size);
									theCategory.setColor(color);
									theCategory.setGender(gender);
									categories.add(theCategory);
								}								
							}
						}
						
						Sheet LDSheet = workbook.getSheetAt(2); // contains LD
						i = 1;
						while (i <= LDSheet.getLastRowNum()) { // for adding LD							
							XSSFRow row = null;
							row = (XSSFRow) LDSheet.getRow(i++);

							if (row.getCell(0) != null) {
								String productType = "LD";
								String artist = formatter.formatCellValue(row.getCell(1));
								String modelCode = formatter.formatCellValue(row.getCell(2));
								CategoriesMst category = categoriesService.getLD(productType, artist, modelCode);
								if(category==null) {
									CategoriesMst theCategory = new CategoriesMst();
									theCategory.setProductType(productType);
									theCategory.setArtist(artist);
									theCategory.setModelCode(modelCode);
									categories.add(theCategory);
								}								
							}
						}
						
						Sheet LGSheet = workbook.getSheetAt(3); // contains LG
						i = 1;
						while (i <= LGSheet.getLastRowNum()) { // for adding LG							
							XSSFRow row = null;
							row = (XSSFRow) LGSheet.getRow(i++);

							if (row.getCell(0) != null) {
								String productType = "LG";
								String modelCode = formatter.formatCellValue(row.getCell(1));
								String modelType = formatter.formatCellValue(row.getCell(2));
								String artist = formatter.formatCellValue(row.getCell(3));
								String color = formatter.formatCellValue(row.getCell(4));
								CategoriesMst category = categoriesService.getLG(productType, modelCode+"-"+modelType, artist, color);
								if(category==null) {
									CategoriesMst theCategory = new CategoriesMst();
									theCategory.setProductType(productType);
									theCategory.setModelCode(modelCode + "-" + modelType);
									theCategory.setArtist(artist);
									theCategory.setColor(color);
									categories.add(theCategory);
								}								
							}
						}
						
						Sheet SlingSheet = workbook.getSheetAt(4); // contains Sling
						i = 1;
						while (i <= SlingSheet.getLastRowNum()) { // for adding Sling							
							XSSFRow row = null;
							row = (XSSFRow) SlingSheet.getRow(i++);

							if (row.getCell(0) != null) {
								String productType = "Sling";
								String modelCode = formatter.formatCellValue(row.getCell(2));
								String artist = formatter.formatCellValue(row.getCell(1));
								CategoriesMst category = categoriesService.getSling(productType, artist, modelCode);
								if(category==null) {
									CategoriesMst theCategory = new CategoriesMst();
									theCategory.setProductType(productType);
									theCategory.setArtist(artist);
									theCategory.setModelCode(modelCode);
									categories.add(theCategory);
								}								
							}
						}
						
						categoriesService.addAll(categories);

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
	
	
	@GetMapping(API.getProductTypes)
	public @ResponseBody ResponseEntity<List<String>> getProductTypes(){
		try {
			return new ResponseEntity<List<String>>(categoriesService.getProductTypes(), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(API.getArtists)
	public @ResponseBody ResponseEntity<List<String>> getArtists(@RequestParam String productType ){
		try {
			return new ResponseEntity<List<String>>(categoriesService.getArtists(productType), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(API.getModelCodes)
	public @ResponseBody ResponseEntity<List<String>> getModelCodes(@RequestParam String artist, @RequestParam String productType){
		try {
			return new ResponseEntity<List<String>>(categoriesService.getModelCodes(artist, productType), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(API.getSizes)
	public @ResponseBody ResponseEntity<List<String>> getSizes(@RequestParam String artist, @RequestParam String productType){
		try {
			return new ResponseEntity<List<String>>(categoriesService.getSizes(artist, productType), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(API.getGenders)
	public @ResponseBody ResponseEntity<List<String>> getGenders(@RequestParam String artist, @RequestParam String productType, @RequestParam String size){
		try {
			return new ResponseEntity<List<String>>(categoriesService.getGenders(artist, productType, size), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(API.getColorsByGender)
	public @ResponseBody ResponseEntity<List<String>> getColors(@RequestParam String artist, @RequestParam String productType, @RequestParam String size, @RequestParam String gender){
		try {
			return new ResponseEntity<List<String>>(categoriesService.getColorsByGender(artist, productType, size, gender), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(API.getColorsByCode)
	public @ResponseBody ResponseEntity<List<String>> getColorsByCode(@RequestParam String artist, @RequestParam String productType, @RequestParam String modelCode){
		try {
			modelCode = modelCode.split("-")[0];
			return new ResponseEntity<List<String>>(categoriesService.getColorsByCode(artist, productType, modelCode), HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
		
}
