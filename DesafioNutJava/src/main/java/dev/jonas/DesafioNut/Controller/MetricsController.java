package dev.jonas.DesafioNut.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import dev.jonas.DesafioNut.Service.MetricService;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;

@Controller
public class MetricsController {
    @Autowired
    private MetricService metricService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Scheduled(fixedRateString = "${metric.cpu.rate}")
    public void sendCPUMetric(){
        simpMessagingTemplate.convertAndSend("/topic/metrics", metricService.createCPUMetric());
        System.out.println("CPU Metric sent");
    }

    @Scheduled(fixedRateString = "${metric.memory.rate}")
    public void sendMemoryMetric(){
        simpMessagingTemplate.convertAndSend("/topic/metrics", metricService.createMemoryMetric());
        System.out.println("Memory Metric sent");
    }

    @Scheduled(fixedRateString = "${metric.latency.rate}")
    public void sendLatencyMetric(){
        simpMessagingTemplate.convertAndSend("/topic/metrics", metricService.createLatencyMetric());
        System.out.println("Latency Metric sent");
    }

}
