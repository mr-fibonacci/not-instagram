import PostForm from './components/PostForm';
import ProfileForm from './components/ProfileForm';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import CommentForm from './components/CommentForm';
import './axiosDefaults'

function App() {
    return (
        <div className="App">
            <CommentForm />
            <SignInForm />
            <SignUpForm />
            <ProfileForm />
            <PostForm />
        </div>
    );
}

export default App;
