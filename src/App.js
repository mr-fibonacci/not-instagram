import PostForm from './components/PostForm';
import ProfileForm from './components/ProfileForm';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import CommentForm from './components/CommentForm';
import './axiosDefaults'
import NavBar from './components/NavBar';

function App() {
    return (
        <div className="App">
            <NavBar />
            <CommentForm />
            <SignInForm />
            <SignUpForm />
            <ProfileForm />
            <PostForm />
        </div>
    );
}

export default App;
