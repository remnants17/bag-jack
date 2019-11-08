package com.a2mee.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "categories_mst")
public class CategoriesMst {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="category_id")
	private int categoryId;
	
	@Column(name="product_type")
	private String productType;
	
	@Column(name="model_code")
	private String modelCode;
	
	@Column(name="model_type")
	private String modelType;
	
	@Column(name="artist")
	private String artist;
	
	@Column(name="color")
	private String color;
	
	@Column(name="size")
	private int size;
	
	@Column(name="gender")
	private String gender;

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public String getModelCode() {
		return modelCode;
	}

	public void setModelCode(String modelCode) {
		this.modelCode = modelCode;
	}

	public String getModelType() {
		return modelType;
	}

	public void setModelType(String modelType) {
		this.modelType = modelType;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	@Override
	public String toString() {
		return "CategoriesMst [categoryId=" + categoryId + ", productType=" + productType + ", modelCode=" + modelCode
				+ ", modelType=" + modelType + ", artist=" + artist + ", color=" + color + ", size=" + size
				+ ", gender=" + gender + "]";
	}	
	
}