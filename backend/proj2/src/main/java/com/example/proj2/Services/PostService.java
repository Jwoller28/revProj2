package com.example.proj2.Services;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.LinkedBlockingQueue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import com.example.proj2.entity.Post;
import com.example.proj2.repositories.PostRepository;
import java.util.concurrent.TimeUnit;
import java.util.List;

@Service
public class PostService {
    
    @Autowired
    private KafkaTemplate<Long, Post> kafkaPostTemplate;

    public static final Logger log = LoggerFactory.getLogger(PostService.class);

    @Autowired
    private PostRepository postRepository;

    private final BlockingQueue<Post> postQueue = new LinkedBlockingQueue<>(100); // Allows for Thread Safety
    
    // private List<Post> postList = new ArrayList<>();
    
    public void sendPost(Post post)
    {   
        
        CompletableFuture<SendResult<Long,Post>> future = kafkaPostTemplate.send("unprocessedPosts", post);
        future.whenComplete((result, ex) -> {
            if(ex == null)
            {
                System.out.println("Sent Post with offset " + result.getRecordMetadata().offset());
            }
            else {
                System.out.println("Fail: " + ex.getMessage());
            }
        
        });
    }

    // @KafkaListener(topics="processedPosts", containerFactory = "kafkaListenerContainerFactory", groupId = "app-users")
    // public void getPost(List<Post> posts)
    // {   
    //     postList.addAll(posts);
    // }

    // public List<Post> getPostList() 
    // {
    //     List<Post> ret = postList;
    //     postList = new ArrayList<Post>();
    //     return ret;
    // }

    // Kafka listener
    @KafkaListener(topics="processedPosts", containerFactory = "kafkaListenerContainerFactory", groupId = "app-users")
    public void listen(Post post) {
	if(post != null)
	{
	log.info(post.toString());
	Post postIn = postRepository.saveAndFlush(post); // Keep persisted Post
        postQueue.offer(postIn); // Add posts to the queue
	System.out.println(postQueue.size());
	}
    }

    public Post getNextPost() {
	return postQueue.poll();
    }

    public List<Post> getAllPosts(){

	return postRepository.findAll(Sort.by(Sort.Direction.DESC, "creation"));

	}
    
    public Post getAPost(long id) {
        return (postRepository.findById(id)).get();
    }
     
    
}
