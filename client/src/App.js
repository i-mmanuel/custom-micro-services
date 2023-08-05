import CreatePost from './components/CreatePost';
import ListPost from './components/ListPosts';

const App = () => {
	return (
		<div className='App container'>
			<h2>Create Post</h2>
			<CreatePost />
			<hr />
			<h2>Posts</h2>
			<ListPost />
		</div>
	);
};

export default App;
