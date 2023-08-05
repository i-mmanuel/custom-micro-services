import React, { useState } from 'react';
import axios from 'axios';

const CreateComment = ({ postId }) => {
	const [content, setContent] = useState('');

	const onSubmit = async event => {
		event.preventDefault();

		await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
			content,
		});

		setContent('');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label>New Comment</label>
					<input value={content} onChange={e => setContent(e.target.value)} className='mt-3 mb-3 form-control' />
				</div>
				<button className='btn btn-primary '>Submit</button>
			</form>
		</div>
	);
};

export default CreateComment;
