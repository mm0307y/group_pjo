package com.example.back.controller;

import com.example.back.dao.UserDao;
import com.example.back.model.Role;
import com.example.back.model.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

//1. RestController를 사용하면 text로 출력이 나감(text/plain, application/json)
//2. Controller를 사용하면 요청이 페이지로 출력이 나감
//단 만일 text나 json포맷을 원하는 경우 리턴타입 앞에 @ResponseBody
@Log4j2
@Controller
public class IndexController {
    //com.example.demo.dao.UserDao
    @Autowired
    private UserDao userDao;
    //com.example.demo.config.SecurityConfig.java
    @Autowired
    private PasswordEncoder passwordEncoder;
    @GetMapping({"", "/"})
    public String index(){
        log.info("index");
        //Spring ViewResolver
        return "index";//resources/templates/index.html
    }

    @PreAuthorize("hasRole('MANAGER') or hashRole('ADMIN')")
    @GetMapping("/data")
    public @ResponseBody String data(){
        log.info("data");
        return "데이터 정보";
    }

    @GetMapping("/user")
    public @ResponseBody String user(){
        log.info("user");
        return "user";
    }
    @GetMapping("/admin")
    public @ResponseBody String admin(){
        log.info("admin");
        return "admin";
    }
    @GetMapping("/notice")
    public @ResponseBody String notice(){
        log.info("notice");
        return "notice";
    }
    @GetMapping("/manager")
    public @ResponseBody String manager(){
        log.info("manager");
        return "매니저 페이지 입니다.";
    }
    //스프링 시큐리티 낚아채서 아래 코드가 실행이 안됨
    //낚아채지 못하는 설정하기
    @GetMapping("/loginForm")
    public String loginPage(){
        //리턴타입 앞에 @ResponseBody가 없으니까 페이지 출력요청함.
        return "auth/loginForm";// resources/templates/auth/loginForm.html
    }
/*
login처리는 시큐리티가 낚아채서 처리해주므로 아래 코드는 필요없음.
UserDetailsService클래스 정의된 loadUserByUsername메소드를 호출한다.
사용자 정의 로그인을 진행하려면 loadUserByUsername 을 메소드 오버라이딩 한다.
구현체 클래스를 생성하시오.
    @GetMapping("/loginProcess")
    public @ResponseBody String loginProcess(){
        return "이 코드는 필요없음.";
    }
*/
    //회원가입 페이지 열기
    @GetMapping("/joinForm")
    public String joinForm(){
        return "auth/joinForm";
    }
    //회원가입 처리하기
    @PostMapping("/join")
    public String join(User user){
        //user.setRole("USER");
        String rawPassword = user.getPassword();//암호화가 안된 비번임.- 시큐리티에서는 에러 발생
        //평문으로 된 비번을 받아서 암호된 비번으로 변경함.
        String encPassword = passwordEncoder.encode(rawPassword);
        user.setUser_pw(encPassword);
        userDao.userInsert(user);
        return "redirect:/loginForm";//회원가입이 성공하면 이 요청을 리다이렉트 해줌.
    }//end of 회원가입

    @GetMapping("/custom-login")
    public String loginPage2(@RequestParam(value = "error", required = false) String error, Model model){
        if(error !=null){
           model.addAttribute("errorMessage", "아이디 또는 비밀번호가 잘못되었습니다.");
        }
        return "auth/loginForm";
    }
}
