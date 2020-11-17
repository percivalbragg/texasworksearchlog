package com.percivalbragg.jobsearch;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration  
//Enable Swagger  
@EnableSwagger2  
public class SwaggerConfig {
	
	//creating bean  
	@Bean  
	public Docket api()  
	{
		//creating constructor of Docket class that accepts parameter DocumentationType  
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				//.paths(PathSelectors.ant("/api/*"))
				.apis(RequestHandlerSelectors.basePackage("com.percivalbragg.jobsearch"))
				.build()
				.apiInfo(apiDetails());
	}
	
	private ApiInfo apiDetails() {
		return new ApiInfo(
			"Texas Work Search Log API",
			"API to be able to log work search for Texas unemployment eligibility",
			"1.0",
			"For personal use, not public",
			new springfox.documentation.service.Contact("Percival Bragg", "http://alamophtographer.com", "percivalbragg@yahoo.com"),
			"API License",
			"http://alamophtographer.com",
			Collections.emptyList()
		);
				
	}
	
}
