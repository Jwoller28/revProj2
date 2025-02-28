import React, {MutableRefObject, FormEventHandler} from 'react'



interface CommentDumbProp {
	setMessage : Function;
	onSubmit : FormEventHandler<HTMLFormElement>;
	formRef : MutableRefObject<HTMLFormElement | null>
}
function CommentDumb(prop : CommentDumbProp)
{
	return(
		<div>
			<form id = "commentForm" encType = "multipart/form-data" onSubmit = {prop.onSubmit} ref = {prop.formRef}>
<<<<<<< HEAD
			<label htmlFor="message">Write your thoughts:</label><br/>
			<input type="text" id="message" name = "message" onChange = {(e) => prop.setMessage(e.target.value)}></input>
=======
			<label htmlFor="message">Write your comment:</label><br/>
			<input type="text" name = "message" onChange = {(e) => prop.setMessage(e.target.value)}></input>
>>>>>>> origin/main
			<button type = "submit" id = "commentButton"> Send </button>
			</form>
		</div>
	)
}

export default CommentDumb
