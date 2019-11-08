package com.a2mee.model.access;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "access_role_permission")
@AssociationOverrides({
		@AssociationOverride(name = "pk.permission", 
			joinColumns = @JoinColumn(name = "permission_Id")),
		@AssociationOverride(name = "pk.role", 
			joinColumns = @JoinColumn(name = "role_Id")) })
public class RolePermission implements java.io.Serializable {

	
	private static final long serialVersionUID = 4050660680047579957L;
	
	@EmbeddedId
	private RolePermissionID pk = new RolePermissionID();
	
	@Column(name = "access_type", nullable = false, length = 10)
	private String type;
	

	public RolePermissionID getPk() {
		return pk;
	}
	
	@Transient
	public Permission getPermission() {
		return getPk().getPermission();
	}
 
	public void setPermission(Permission permission) {
		getPk().setPermission(permission);
	}
 
	@Transient
	public Role getRole() {
		return getPk().getRole();
	}
 
	public void setRole(Role role) {
		getPk().setRole(role);
	}
 
	
	public void setPk(RolePermissionID pk) {
		this.pk = pk;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public int hashCode() {
		return (getPk() != null ? getPk().hashCode() : 0);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof RolePermission))
			return false;
		RolePermission other = (RolePermission) obj;
		if (pk == null) {
			if (other.pk != null)
				return false;
		} else if (!pk.equals(other.pk))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		return true;
	}

}
