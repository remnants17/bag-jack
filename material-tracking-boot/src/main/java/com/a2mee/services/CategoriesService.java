package com.a2mee.services;

import java.util.List;

import org.springframework.util.MultiValueMap;

import com.a2mee.model.CategoriesMst;

public interface CategoriesService{

	CategoriesMst getFC(String productType, String modelCode, String artist, String color);
	
	CategoriesMst getJacket(String productType, String artist, int size, String color, String gender);

	CategoriesMst getLD(String productType, String artist, String modelCode);

	CategoriesMst getLG(String productType, String modelCode, String artist, String color);

	CategoriesMst getSling(String productType, String artist, String modelCode);
	
	void addAll(List<CategoriesMst> categories);

	List<String> getProductTypes();

	List<String> getArtists(String productType);

	List<String> getModelCodes(String artist, String productType);

	List<Integer> getSizes(String artist, String productType);

	List<String> getGenders(String artist, String productType, int size);

	List<String> getColorsByGender(String artist, String productType, int size, String gender);

	List<String> getColorsByCode(String artist, String productType, String modelCode);
	
}