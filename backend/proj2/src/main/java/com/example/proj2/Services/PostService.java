package com.example.proj2.Services;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.LinkedBlockingQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import com.example.proj2.entity.Post;
import com.example.proj2.repositories.PostRepository;

@Service
public class PostService {
    
    @Autowired
    private KafkaTemplate<Long, Post> kafkaPostTemplate;

    @Autowired
    private PostRepository postRepostiory;

    private final BlockingQueue<Post> messageQueue = new LinkedBlockingQueue<>(100); // Allows for Thread Safety
    
    // private List<Post> postList = new ArrayList<>();
    
    public void sendPost(Post post)
    {   
        
        CompletableFuture<SendResult<Long,Post>> future = kafkaPostTemplate.send("unprocessedPosts", post.getPost_Id(), post);
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
        messageQueue.offer(post); // Add posts to the queue
	System.out.println(post);
	System.out.println(messageQueue.size());
        postRepostiory.save(post); //persists Post
	}
    }

    public Post getNextPost() throws InterruptedException {
        // If Queue is 90% to 100
	// Start taking until it is 50%
	if(messageQueue.remainingCapacity() < 10)
	{
		return messageQueue.take();
	}
	else
	{
		return messageQueue.peek();
	}
    }
}