package edu.kh.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
						//Spring security의 자동 성정 중 로그인페이지 이용 안함!
@SpringBootApplication(exclude= {SecurityAutoConfiguration.class})
public class BoardProjectBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardProjectBootApplication.class, args);
	}

}
