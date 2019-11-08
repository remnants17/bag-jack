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
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
 

@Entity
@JsonIdentityInfo (generator=ObjectIdGenerators.UUIDGenerator.class)
@Table(name = "access_roles")
public class Role implements java.io.Serializable{
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "role_id", unique = true, nullable = false)
	private Integer roleId;
	
	@Column(name = "role_name", nullable = false, length = 255)
	private String name;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pk.role")
	private Set<RolePermission> rolePermission = new HashSet<RolePermission>();
	

	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name = "access_user_role", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	 private Set<UserDetails> user	;
	
	@Column(name = "active", nullable =  false)
	private boolean activate;


	public Integer getRoleId() {
		return roleId;
	}




	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}




	public String getName() {
		return name;
	}




	public void setName(String name) {
		this.name = name;
	}


	public Set<RolePermission> getRolePermission() {
		return rolePermission;
	}




	public void setRolePermission(Set<RolePermission> rolePermission) {
		this.rolePermission = rolePermission;
	}




	public Set<UserDetails> getUser() {
		return user;
	}




	public void setUser(Set<UserDetails> user) {
		this.user = user;
	}




	public boolean isActivate() {
		return activate;
	}




	public void setActivate(boolean activate) {
		this.activate = activate;
	}




	private static final long serialVersionUID = 1L;


//	@Override
//	public String toString() {
//		return "Role [roleId=" + roleId + ", name=" + name + ", rolePermission=" + rolePermission + ", user=" + user
//				+ ", activate=" + activate + "]";
//	}

	
}