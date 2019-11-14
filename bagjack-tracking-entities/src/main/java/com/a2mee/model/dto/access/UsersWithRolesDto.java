package com.a2mee.model.dto.access;

import java.util.List;

import com.a2mee.model.dto.access.UserDto;

public class UsersWithRolesDto {
	
	List<UserDto> userwithrole;
	List<UserDto> userwithoutrole;
	
	
	
	public List<UserDto> getUserwithrole() {
		return userwithrole;
	}
	public void setUserwithrole(List<UserDto> userwithrole) {
		this.userwithrole = userwithrole;
	}
	public List<UserDto> getUserwithoutrole() {
		return userwithoutrole;
	}
	public void setUserwithoutrole(List<UserDto> userwithoutrole) {
		this.userwithoutrole = userwithoutrole;
	}
	
	

}
