package com.a2mee.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.a2mee.model.CategoriesMst;

@Repository
public interface CategoriesRepo extends JpaRepository<CategoriesMst, Integer> {
	
	Optional<CategoriesMst> findByProductTypeAndModelCodeAndArtistAndColor(String productType,
			String modelCode, String artist, String color);

	Optional<CategoriesMst> findByProductTypeAndArtistAndSizeAndColorAndGender(String productType, String artist,
			String size, String color, String gender);

	Optional<CategoriesMst> findByProductTypeAndArtistAndModelCode(String productType, String artist, String modelCode);

	@Query("SELECT DISTINCT c.productType FROM CategoriesMst c")
	List<String> getProductTypes();

	@Query("SELECT DISTINCT c.artist FROM CategoriesMst c where c.productType=?1")
	List<String> getArtists(String productType);

	@Query("SELECT DISTINCT c.modelCode FROM CategoriesMst c where c.artist=?1 and c.productType=?2")
	List<String> getModelCodes(String artist, String productType);

	@Query("SELECT DISTINCT c.size FROM CategoriesMst c where c.artist=?1 and c.productType=?2")
	List<String> getSizes(String artist, String productType);

	@Query("SELECT DISTINCT c.gender FROM CategoriesMst c where c.artist=?1 and c.productType=?2 and c.size=?3")
	List<String> getGenders(String artist, String productType, String size);

	@Query("SELECT DISTINCT c.color FROM CategoriesMst c where c.artist=?1 and c.productType=?2 and c.size=?3 and c.gender=?4")
	List<String> getColorsByGender(String artist, String productType, String size, String gender);

	@Query("SELECT DISTINCT c.color FROM CategoriesMst c where c.artist=?1 and c.productType=?2 and c.modelCode LIKE (CONCAT('%',?3,'%'))")
	List<String> getColorsByCode(String artist, String productType, String modelCode);

	
}