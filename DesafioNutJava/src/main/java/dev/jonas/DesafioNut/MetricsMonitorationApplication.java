package dev.jonas.DesafioNut;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MetricsMonitorationApplication {

	public static void main(String[] args) {
		SpringApplication.run(MetricsMonitorationApplication.class, args);
	}

}
