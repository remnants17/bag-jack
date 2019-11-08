package com.a2mee.repository.access;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.a2mee.model.access.UserDetails;

public interface UserDetailsDao {

	UserDetails addUser(UserDetails user);

	List<UserDetails> getUsers();

	UserDetails getUserById(String id);

	void deleteUser(String id);

	UserDetails addRoles(UserDetails rolelist);

	UserDetails getUserDetailById(String id);

	UserDetails checkUser(String id);

	void updateUser(UserDetails existinguser);

	UserDetails deleteRoles(UserDetails userDetail);

}
