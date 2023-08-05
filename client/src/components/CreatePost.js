import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
	const [title, setTitle] = useState('');

	const onSubmit = async e => {
		e.preventDefault();

		try {
			const { data } = await axios.post('http://localhost:4000/posts', { title });

			setTitle('');
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<div className=' form-group mb-3'>
				<label className='form-label'>Title</label>
				<input
					value={title}
					onChange={e => setTitle(e.target.value)}
					type='text'
					className='form-control'
					id='exampleInputEmail1'
					aria-describedby='emailHelp'
				/>
			</div>
			<button type='submit' className='btn btn-primary'>
				Submit
			</button>
		</form>
	);
};

export default CreatePost;
