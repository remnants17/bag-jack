package com.a2mee.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2mee.model.CategoriesMst;
import com.a2mee.repository.CategoriesRepo;
import com.a2mee.services.CategoriesService;

@Service
public class CategoriesServiceImpl implements CategoriesService{
	
	@Autowired
	CategoriesRepo categoryRepo;

	@Override
	public CategoriesMst getFC(String productType, String modelCode, String artist, String color) {
		return byBasicParamCategory(productType, modelCode, artist, color);
	}

	@Override
	public CategoriesMst getJacket(String productType, String artist, String size, String color, String gender) {
		Optional<CategoriesMst> obj = categoryRepo.findByProductTypeAndArtistAndSizeAndColorAndGender(productType, artist, size, color, gender);
		return obj.isPresent()? obj.get() : null;
	}

	@Override
	public CategoriesMst getLD(String productType, String artist, String modelCode) {
		return byArtistAndCode(productType, artist, modelCode);
	}

	@Override
	public CategoriesMst getLG(String productType, String modelCode, String artist, String color) {
		return byBasicParamCategory(productType, modelCode, artist, color);
	}

	@Override
	public CategoriesMst getSling(String productType, String artist, String modelCode) {
		return byArtistAndCode(productType, artist, modelCode);
	}

	@Override
	public void addAll(List<CategoriesMst> categories) {
		categoryRepo.saveAll(categories);
	}
	
	
	
	private CategoriesMst byBasicParamCategory(String productType, String modelCode, String artist, String color) {
		Optional<CategoriesMst> obj = categoryRepo.findByProductTypeAndModelCodeAndArtistAndColor(productType, modelCode, artist, color);
		return obj.isPresent()? obj.get() : null;
	}
	
	private CategoriesMst byArtistAndCode(String productType, String artist, String modelCode) {
		Optional<CategoriesMst> obj = categoryRepo.findByProductTypeAndArtistAndModelCode(productType, artist, modelCode);
		return obj.isPresent()? obj.get() : null;
	}

	@Override
	public List<String> getProductTypes() {
		return categoryRepo.getProductTypes();
	}

	@Override
	public List<String> getArtists(String productType) {
		return categoryRepo.getArtists(productType);
	}

	@Override
	public List<String> getModelCodes(String artist, String productType) {
		return categoryRepo.getModelCodes(artist, productType);
	}

	@Override
	public List<String> getSizes(String artist, String productType) {
		return categoryRepo.getSizes(artist, productType);
	}

	@Override
	public List<String> getGenders(String artist, String productType, String size) {
		return categoryRepo.getGenders(artist, productType, size);
	}

	@Override
	public List<String> getColorsByGender(String artist, String productType, String size, String gender) {
		return categoryRepo.getColorsByGender(artist, productType, size, gender);
	}

	@Override
	public List<String> getColorsByCode(String artist, String productType, String modelCode) {
		return categoryRepo.getColorsByCode(artist, productType, modelCode);
	}

	
}