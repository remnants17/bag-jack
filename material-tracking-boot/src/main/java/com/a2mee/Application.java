package com.a2mee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;


@SpringBootApplication
//@PropertySource("classpath:sql.properties")
/*@SpringBootConfiguration
@EnableAutoConfiguration*/
/*@EnableBatchProcessing
@EnableScheduling */
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);

	}

}
