import React, { MutableRefObject, FormEventHandler } from 'react';

interface PostFeedProp {
  setMessage: Function;
  setTags: Function;
  onSubmit: FormEventHandler<HTMLFormElement>;
  setFile: Function;
  formRef: MutableRefObject<HTMLFormElement | null>;
}

function PostFeedDumb(prop: PostFeedProp) {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#504dff' }}>
        Create a New Post
      </h2>
      <form
        encType="multipart/form-data"
        id="inputForm"
        name="inputForm"
        onSubmit={prop.onSubmit}
        ref={prop.formRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        {/* Message Input */}
        <div>
          <label
            htmlFor="message_text"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Message Body:
          </label>
          <input
            type="text"
            name="message_text"
            onChange={(e) => prop.setMessage(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '1rem',
            }}
          />
        </div>

<<<<<<< HEAD
            <label htmlFor="message_text">Message</label> <br/>
            <input type="text" id = "message-text" name="message_text" onChange = {(e) => prop.setMessage(e.target.value)} required></input> <br/>

            <label htmlFor="message_tags">Tags</label> <br/>
            <input type="text" id = "message-tags" name="message_tags" onChange = {(e) => prop.setTags(e.target.value)} required></input> <br/>

            <label htmlFor="photo">PNG Images Only</label> <br/>
            <input type="file" id = "photo" name="photo" accept='.png' onChange = {(e) => prop.setFile(e.target.files ? e.target.files[0] : undefined)}></input> <br/>

            <button type="submit" id = "submitButton" name = "submitButton">Post to Feed</button>
            </form>
=======
        {/* Tags Input */}
        <div>
          <label
            htmlFor="message_tags"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Add a Tag?
          </label>
          <input
            type="text"
            name="message_tags"
            onChange={(e) => prop.setTags(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '1rem',
            }}
          />
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="photo"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            PNG Images Only
          </label>
          <input
            type="file"
            name="photo"
            accept=".png"
            onChange={(e) => prop.setFile(e.target.files ? e.target.files[0] : undefined)}
            style={{
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '5px',
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="submitButton"
          name="submitButton"
          style={{
            backgroundColor: '#504dff',
            color: '#fff',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#413cc4')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#504dff')}
        >
          Post to Feed
        </button>
      </form>
>>>>>>> origin/main
    </div>
  );
}

export default PostFeedDumb;
