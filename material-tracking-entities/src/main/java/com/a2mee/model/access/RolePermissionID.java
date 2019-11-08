package com.a2mee.model.access;


import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;


@Embeddable
public class RolePermissionID implements java.io.Serializable {
	

	private static final long serialVersionUID = -9120607274421816301L;
	
	@ManyToOne
	private Permission permission;
	
	@ManyToOne
	private Role role;

	public Permission getPermission() {
		return permission;
	}


	public void setPermission(Permission permission) {
		this.permission = permission;
	}


	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
	}


	@Override
	public int hashCode() {
		 int result;
	        result = (permission != null ? permission.hashCode() : 0);
	        result = 17 * result + (role != null ? role.hashCode() : 0);
	        return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof RolePermissionID))
			return false;
		RolePermissionID other = (RolePermissionID) obj;
		if (role == null) {
			if (other.role != null)
				return false;
		} else if (!role.equals(other.role))
			return false;
		if (permission == null) {
			if (other.permission != null)
				return false;
		} else if (!permission.equals(other.permission))
			return false;
		return true;
	}
	
	
	
	

}
