package com.a2mee.util;

public class API {

	/* ........Category....... */
	public static final String category = "category";
	public static final String uploadCategories = "uploadCategories";
	
	
	/* ........User/Role/Permission....... */
	
		/* ........User....... */
		public static final String user= "user";
		public static final String userpost= "/userpost";
		public static final String userGetAll = "/alluser";
		public static final String userGetOne = "/{id}";
		public static final String getUserPermission = "/permissions/{id}";
		public static final String getUserPermissionMobile = "/permissions/mobile/{id}";
		public static final String deleteUser = "/{id}";
		public static final String assignRoles = "/assignroles";
		public static final String deleteRoles = "/deleteroles";
		public static final String getUserRoles = "/userroles/{id}";
		public static final String userCheck = "/usercheck/{id}";
		public static final String editUser = "/edit";


		/* ........Role....... */
		public static final String roles = "roles";
		public static final String addRole = "";
		public static final String getAllRole = "/allRoles";
		public static final String getAllRoleDetails = "/allRoleDetails";
		public static final String getOneRole = "/{id}";
		public static final String deleteRole = "/{id}";
		public static final String assignUser = "/assignUser";
		public static final String removeUser = "/removeUser";
		public static final String assignPermissions = "/assignPermissions";
		public static final String getUsers = "/getusers/{id}";
		public static final String activate = "/activate";


		/* ........Permissions....... */
		public static final String permission = "permission";
		public static final String addPermission = "";
		public static final String getAllPermissions = "/allPermissions";
		public static final String getOnePermission = "/{id}";
		public static final String deletePermission = "/{id}";

		/* ...Login..... */
		public static final String login = "login";
		public static final String authenticate = "/authenticate";

}
	
