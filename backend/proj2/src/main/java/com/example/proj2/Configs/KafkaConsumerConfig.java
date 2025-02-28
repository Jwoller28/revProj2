package com.example.proj2.Configs;
import java.beans.BeanProperty;
import java.util.HashMap;
import java.util.Map;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.LongDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import com.example.proj2.Serializer.PostDeserializer;
import com.example.proj2.entity.Post;


    @EnableKafka // Enables detection of @Kafka Listener
    @Configuration
    public class KafkaConsumerConfig {
        
        @Value(value = "${spring.kafka.bootstrap-servers}")
        private String bootstrapAddress;

        @Value(value = "${spring.kafka.consumer.group-id}")
        private String groupId;

        
        @Bean
        public ConsumerFactory<Long, Post> consumerFactory() {
            Map<String, Object> props = new HashMap<>();
            props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
            props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
            props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, LongDeserializer.class);
            props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, PostDeserializer.class);
            props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
            props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 50); // Number of records per poll
            props.put(ConsumerConfig.FETCH_MIN_BYTES_CONFIG, 1048576); // Minimum size of data to fetch
            props.put(ConsumerConfig.FETCH_MAX_WAIT_MS_CONFIG, 500);  // Wait time if min bytes not met
            return new DefaultKafkaConsumerFactory<>(props);
        }

        @Bean
        public ConsumerFactory<Long, Post> FilteredConsumerFactory() {
            Map<String, Object> props = new HashMap<>();
            props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
            props.put(ConsumerConfig.GROUP_ID_CONFIG, "filtered-app-users");
            props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, LongDeserializer.class);
            props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, PostDeserializer.class);
            props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
            props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 50); // Number of records per poll
            props.put(ConsumerConfig.FETCH_MIN_BYTES_CONFIG, 1048576); // Minimum size of data to fetch
            props.put(ConsumerConfig.FETCH_MAX_WAIT_MS_CONFIG, 500);  // Wait time if min bytes not met
            return new DefaultKafkaConsumerFactory<>(props);
        }

        @Bean
        public ConcurrentKafkaListenerContainerFactory<Long, Post> kafkaListenerContainerFactory() {
            ConcurrentKafkaListenerContainerFactory<Long, Post> factory = new ConcurrentKafkaListenerContainerFactory<>();
            factory.setConsumerFactory(consumerFactory());
            factory.setConcurrency(5); // 5 Listeners
            factory.getContainerProperties();
            return factory;
        }

        @Bean
        public ConcurrentKafkaListenerContainerFactory<Long, Post> FilteredKafkaListenerContainerFactory() {
            ConcurrentKafkaListenerContainerFactory<Long, Post> factory = new ConcurrentKafkaListenerContainerFactory<>();
            factory.setConsumerFactory(FilteredConsumerFactory());
            factory.setConcurrency(5); // 5 Listeners
            factory.getContainerProperties();
            return factory;
        }
        
    }
