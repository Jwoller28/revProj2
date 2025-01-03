package com.example.proj2.Controllers;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.proj2.entity.Post;
import com.example.proj2.Services.PostService;

@RestController
public class PostController {
    
    @Autowired
    final static Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @PostMapping(value = "/posts")
    // Turn the Request Param into Request Body with object that has these fields
    public void sendPost(@RequestParam("goal_id") long goalId,
    @RequestParam("user_id") int userId,
    @RequestParam("message_text") String messageText,
    @RequestPart("photo") MultipartFile photo)
    {
    logger.info("Arrives at Controller");

    Post post = new Post();
    post.setGoal_id(goalId);    
    post.setUser_id(userId);   
    post.setMessage_text(messageText);
        
        try {
        byte[] photoBytes = photo.getBytes();
        System.out.println(photoBytes);
        post.setPhoto(photoBytes);
    } catch (IOException e) {
        e.printStackTrace();
    }

    postService.sendPost(post);

    }

    // @GetMapping("/api/posts")
    // public List<Post> getPosts()
    // {   
    //    return postService.getPostList();
    // }

@GetMapping("/posts")
public ResponseEntity<Post> poll() {
    logger.info("Arrives at Controller (GET)");
    try {
        // Wait up to 30 seconds for a new message
        Post post = postService.getNextPost(30000); // This call waits for the next post
	logger.info(post.toString());
        if (post != null) {
            return ResponseEntity.ok(post); // Return the post with HTTP 200 status
        } else {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no post is found
        }
    } catch (InterruptedException e) {
        // Handle interruption gracefully, logging the error and setting the interrupt flag
        Thread.currentThread().interrupt();
        return ResponseEntity.status(500).body(null); // Return HTTP 500 Internal Server Error on interruption
    }
}

}

