package com.a2mee.services.impl.access;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2mee.model.access.UserDetails;
import com.a2mee.repository.access.UserDetailsDao;
import com.a2mee.services.access.LoginService;
@Service
public class LoginServiceImpl implements LoginService{

	
	@Autowired
	UserDetailsDao loginDao;
	


	@Override
	public UserDetails getUser(String id, String password) {
		UserDetails nulluser = null;
		UserDetails loginUser = loginDao.getUserById(id);

if (loginUser.getPassword().equals(password)) {
	return loginUser;
}
else {
return nulluser;
}
		
	}
}
