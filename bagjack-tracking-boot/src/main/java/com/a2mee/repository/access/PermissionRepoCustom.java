package com.a2mee.repository.access;



import java.util.List;

import com.a2mee.model.access.Permission;



public interface PermissionRepoCustom {
	
	void addPermission(Permission userPermisson);

	List<Permission> getAllPermisions();

	Permission getPermission(int id);

	void deletePermissionById(int id);

}
