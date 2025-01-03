package com.example.proj2.entity;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="posts")
public class Post {

    @Id
    @GeneratedValue
    private long post_Id;

    @Column(name = "goal_id")
    private long goal_id;
    
    @Column(name = "sent_by")
    private int user_id;

    @Column(name = "message_text")
    private String message_text;

    @Column(name = "img_data", columnDefinition="BLOB")
    @Lob // Specifies this object is either a large byte object (img/video) or char object (long text)
    @Basic(fetch = FetchType.LAZY)
    private byte[] photo;


    public String getMessage_text() {
        return message_text;
    }



    public void setMessage_text(String message_text) {
        this.message_text = message_text;
    }



    public Post() {}



    public Post(long goal_id, int user_id, String message_text, byte[] photo) {
        this.goal_id = goal_id;
        this.message_text = message_text;
        this.user_id = user_id;
        this.photo = photo;
    }

    public long getPost_Id() {
        return post_Id;
    }

    public long getGoal_id() {
        return goal_id;
    }

    public void setGoal_id(long goal_id) {
        this.goal_id = goal_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

     
}
