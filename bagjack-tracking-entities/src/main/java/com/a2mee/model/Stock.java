package com.a2mee.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stock_tr")
public class Stock {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="stock_id")
	private int stockId;
	
	@Column(name="product_count")
	private int productCount;
	
	@Column(name="serial_code")
	private String serialCode;
	
	@Column(name="product_type")
	private String productType;
	
	@Column(name="artist")
	private String artist;
	
	@Column(name="model_code")
	private String modelCode;
	
	@Column(name="size")
	private String size;
	
	@Column(name="gender")
	private String gender;
	
	@Column(name="color")
	private String color;
	
	@Column(name="qr_code")
	private String productCode;
	
	@Column(name="is_sold")
	private String isSold;
	
	@Column(name="stock_user_id")
	private String stockUserId;

	@Column(name="stock_date")
	private Date stockDate;
	
	@Column(name="sale_user_id")
	private String saleUserId;
	
	@Column(name="sale_date")
	private Date saleDate;
	
	@Column(name="return_user_id")
	private String returnUserId;
	
	@Column(name="return_date")
	private Date returnDate;
	
	
	public int getStockId() {
		return stockId;
	}

	public void setStockId(int stockId) {
		this.stockId = stockId;
	}

	public int getProductCount() {
		return productCount;
	}

	public void setProductCount(int productCount) {
		this.productCount = productCount;
	}	

	public String getSerialCode() {
		return serialCode;
	}

	public void setSerialCode(String serialCode) {
		this.serialCode = serialCode;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {		
		this.artist = artist;
	}

	public String getModelCode() {
		return modelCode;
	}

	public void setModelCode(String modelCode) {
		this.modelCode = modelCode;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}	

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}	

	public String getIsSold() {
		return isSold;
	}

	public void setIsSold(String isSold) {
		this.isSold = isSold;
	}	

	public Date getStockDate() {
		return stockDate;
	}

	public void setStockDate(Date stockDate) {
		this.stockDate = stockDate;
	}

	public Date getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(Date saleDate) {
		this.saleDate = saleDate;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}

	public String getStockUserId() {
		return stockUserId;
	}

	public void setStockUserId(String stockUserId) {
		this.stockUserId = stockUserId;
	}

	public String getSaleUserId() {
		return saleUserId;
	}

	public void setSaleUserId(String saleUserId) {
		this.saleUserId = saleUserId;
	}

	public String getReturnUserId() {
		return returnUserId;
	}

	public void setReturnUserId(String returnUserId) {
		this.returnUserId = returnUserId;
	}

	@Override
	public String toString() {
		return "Stock [stockId=" + stockId + ", productCount=" + productCount + ", serialCode=" + serialCode
				+ ", productType=" + productType + ", artist=" + artist + ", modelCode=" + modelCode + ", size=" + size
				+ ", gender=" + gender + ", color=" + color + ", productCode=" + productCode + ", isSold=" + isSold
				+ ", stockUserId=" + stockUserId + ", stockDate=" + stockDate + ", saleUserId=" + saleUserId
				+ ", saleDate=" + saleDate + ", returnUserId=" + returnUserId + ", returnDate=" + returnDate + "]";
	}
	
	
}
