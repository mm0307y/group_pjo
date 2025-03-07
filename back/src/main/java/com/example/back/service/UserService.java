package com.example.back.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.back.dao.UserDao;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor  // ✅ 생성자 자동 생성 (Lombok 사용)
public class UserService {
    private final UserDao userDao;  // ✅ `@Autowired` 대신 `final` 사용하여 생성자 주입

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
                log.info("🔍 사용자 조회: " + userId);
                return userDao.findByUsername(userId);
            }
        };
    }
}
