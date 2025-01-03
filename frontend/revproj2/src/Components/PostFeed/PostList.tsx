import React, { useEffect, useState } from 'react'
import { getPosts } from '../../API/Axios';

export interface Post {
    // post_id:number;
    goal_id:number;
    user_id:number;
    message_text:string;
    photo: string;

}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Start polling function with delay
  const startPolling = async () => {
      while (true) {
          try {
              const newPost = await getPosts();
              if(!newPost)
              {
                throw Error;
              }
              console.log("New Post: " + newPost)
              setPosts((prevPosts) => [newPost, ...prevPosts]); // Appends at the start of the list
              }
          catch (error) {
              console.error("Error during polling:", error);
          }

          // Delay between polling requests (e.g., 5 seconds)
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Adjust polling interval as needed
      }
  };

  useEffect(() => {
      startPolling(); // Start polling when component mounts
  }, []); // Empty dependency array ensures it runs only once


  function cleanBase64(base64: string | undefined): string {
    if (!base64) {
        console.error("Received an invalid base64 string:", base64);
        return '';  // Return an empty string if base64 is undefined or null
    }
    return base64.replace(/[\r\n]/g, "").replace(/\s/g, "");
  }


  function binaryStringToImage(binaryData: string | undefined): string {
    if (!binaryData) {
        console.error("No binary data provided:", binaryData);
        return '';  // Return a default or placeholder image if data is missing
    }
    
    const cleanData = cleanBase64(binaryData); // Clean base64 string
    const binaryString = atob(cleanData); // Decoding the base64 binary string
    const byteArray = new Uint8Array(binaryString.length);

    // Convert the binary string to a byte array
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the byte array and use Object URL
    const blob = new Blob([byteArray], { type: 'image/png' }); // Update MIME type if needed
    const url = URL.createObjectURL(blob);

    return url;
}

    return (
      <div>
          <h3>Consumed Messages: </h3>
            <div>
            {posts.map((post,index) => (
                      <div key = {index}>
                        <h5>Goal ID: {post.goal_id}</h5>
                        <p>User ID: {post.user_id}</p>
                        <p>Messge Text: {post.message_text}</p>
                        <img loading="lazy" src = {binaryStringToImage(post.photo)} width="200" height="auto"></img>
                        </div>
                  ))}
            </div>
      </div>
      )
    }
  
  export default PostList

  
  
