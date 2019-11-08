package com.a2mee.model.dto.access;

public class PermissionTypeDto {

	private Integer permissionId;
	String permission;
	String type;
	String permissionValue;

	

	public PermissionTypeDto(String permission, String type, String permissionValue) {
		super();
		this.permission = permission;
		this.type = type;
		this.permissionValue = permissionValue;
	}

	public PermissionTypeDto() {
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getPermissionId() {
		return permissionId;
	}

	public void setPermissionId(Integer permissionId) {
		this.permissionId = permissionId;
	}

	public String getPermissionValue() {
		return permissionValue;
	}

	public void setPermissionValue(String permissionValue) {
		this.permissionValue = permissionValue;
	}

}
