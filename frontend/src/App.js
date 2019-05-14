import React from 'react';
import Header from 'Header';
import PostsContainer from 'PostsContainer';
import Footer from 'Footer';
import config from 'config.js';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        fetch(`${config['data-endpoint']}posts`)
            .then(response => response.json())
            .then(posts => {
                this.setState({ posts });
            });
    }

    render() {
        return (
            <div className="app">
                <Header title="Logo" />
                <PostsContainer posts={this.state.posts}/>
                <Footer />
            </div>
        );
    }
}

export default App;