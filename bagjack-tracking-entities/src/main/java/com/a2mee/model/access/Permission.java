package com.a2mee.model.access;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo (generator=ObjectIdGenerators.UUIDGenerator.class)
@Table(name = "access_permissions")

public class Permission implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "permission_id", unique = true, nullable = false)
	private Integer permissionId;
	
	@Column(name = "permission_name", nullable = false)
	private String  name;
	@Column(name = "permission_value", nullable = false)
	private String  pvalue;
	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pk.permission", cascade=CascadeType.ALL)
//	private Set<RolePermission> rolePermission = new HashSet<RolePermission>(0);
	
	public Permission() {
	}

	public Permission(String name) {
		this.name = name;
	}

	public Integer getPermissionId() {
		return permissionId;
	}

	public void setPermissionId(Integer permissionId) {
		this.permissionId = permissionId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPvalue() {
		return pvalue;
	}

	public void setPvalue(String pvalue) {
		this.pvalue = pvalue;
	}

//	public Set<RolePermission> getRolePermission() {
//		return rolePermission;
//	}
//
//	public void setRolePermission(Set<RolePermission> rolePermission) {
//		this.rolePermission = rolePermission;
//	}

	
	

	
}