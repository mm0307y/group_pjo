package com.example.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.back.dao.UserDao;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {

            @Override
            public UserDetails loadUserByUsername(String user_id) throws UsernameNotFoundException {
                log.info(user_id);
                return userDao.findByUserid(user_id);
            }
            
        };
    }
}
