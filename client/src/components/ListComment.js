import React, { useState } from 'react';

const ListComment = ({ comments }) => {
	const renderedComments = comments.map(comment => {
		let content;

		if (comment.status === 'approved') {
			content = comment.content;
		}

		if (comment.status === 'pending') {
			content = 'This comment is await moderation';
		}

		if (comment.status === 'rejected') {
			content = 'This comment is deleted';
		}

		return <li key={comment.id}>{content}</li>;
	});

	return <ul>{renderedComments}</ul>;
};

export default ListComment;
