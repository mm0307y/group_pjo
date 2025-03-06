package com.example.back;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

//JPA사용할 땐 필요 없는 클래스 입니다.
//JPA사용하면 Hibernate를 사용하는 겁니다. 
//JPA를 사용하면 쿼리문을 개발자가 직접 적지 않습니다. - 쿼리문(DDL, DML)을 자동으로 생성해줌. - 조인문, 프로시저
//join문에 대한 이해 없이 JPA를 사용하는 것은 무한루프에 빠질 수  있다. 저장프로시저 - 일괄처리 
//myBatis는 쿼리문을 xml문서에 관리 합니다. 
//spring boot프로젝트에서는 정적페이지를 관리하는 resources폴더가 따로 존재합니다.
//우리는 UI/UX를 리액트를 사용하므로 여기에 image폴더나 css폴더 js폴더를 추가하지 않아도 괜찮아
//따라서 js나 css 또는 image폴더는 인증을 거칠 필요가 없다. - 여기에 대한 설정은 하지 않았다.
//myBatis사용을 위해서 implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.4' 추가해야 함.
//PerpertySource에 application.yml파일을 추가한 건 오라클 드라이버 클래스 및 계정 정보가 들어 있다.
//또 더하여 커넥션풀을 지원하는 히카리씨피 라이브러리를 사용하여 DB연동시에 반복되는 과정을 줄여 준다.
//멀티티어 환경에서는 커넥션 풀을 사용한다.- 엔터프라이즈 서버(웹로직, 웹스피어, JEUS, JBOSS,,,,)
@Configuration
//@PropertySource("classpath:/application.properties")
@PropertySource("classpath:/application.yml")
//@MapperScan(basePackages = "com.example.demo.mapper")
public class DatabaseConfiguration {
    private static final Logger logger = LogManager.getLogger(DatabaseConfiguration.class);
    //메소드 이름 앞에는 @Bean어노테이션을 붙여서 스프링 컨테이너 로 부터 객체 라이프 사이클 관리 받는다.
    //즉 A a = null; -> A a = new A(); 라이프사이클 관리받지 않을거야. 자원에 대한 회수도 개발자가 책임을 져야 한다.
    //예전에는 이런 설정을 모두 xml에서 했다. maven방식 스프링 플젝 생성하면 pom.xml(어노테이션을 사용가능함.)
    //환경 설정을 자바코드에서 처리하고 추가적인 xml문서를 사용하지 않아도 된다.
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.hikari")
    public HikariConfig hikariConfig() {//HikariCP 환경 설정을 해줌. - 속성값이 필요해 -> application.yml에 있어.
        return new HikariConfig();
    }

    @Bean
    public DataSource dataSource() {
        //DataSource는 물리적으로 떨어져 있는 서버에 커넥션을 맺게 해줌(AWS, DB서버가 해외에 있다.)
        //DataSource가 기존에 Connection객체와 다른 점은 원격객체를 호출할 수 있다는 점이다.
        //javax.sql.*
        DataSource dataSource = new HikariDataSource(hikariConfig());
        logger.info("datasource : {}", dataSource);
        return dataSource;
    }
    @Autowired
    private ApplicationContext applicationContext;
    //DataSource로 커넥션 풀에 필요한 정보를 얻어서 실제 DB연동에 필요한 객체를 생성하고 관리해줌.
    //SqlSessionFactory는 myBatis에서 제공하는 클래스로 원격객체에 접근해서 DML을 처리할 수 있도록
    //객체를 주입하고 관리해줌.
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        //classpath는 src/main/resourcs이고 해당 쿼리가 있는 xml 위치는 본인의 취향대로 위치키시고 그에 맞도록 설정해주면 된다.
        sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:/mapper/**/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }
    //SqlSessionFactory가 생성되면 이 인스턴스로 SqlSessionTemplate객체 주입 받습니다.
    //SqlSessionTemplate가 있어서 insert(), update(), delete, selectOne, selectList 등 메소드 제공 받습니다.
    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
