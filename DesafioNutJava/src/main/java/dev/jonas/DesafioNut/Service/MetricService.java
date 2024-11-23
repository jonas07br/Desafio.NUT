package dev.jonas.DesafioNut.Service;

import java.util.Random;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import dev.jonas.DesafioNut.Model.Metric;


@Service
public class MetricService {
    private final Random random = new Random();

    public Metric createCPUMetric(){
        return new Metric("CPU", random.nextInt(100));
    }
    public Metric createMemoryMetric(){
        return new Metric("Memory", random.nextInt(100));
    }
    public Metric createLatencyMetric(){
        return new Metric("Latency", random.nextInt(450)+50);
    }
}
