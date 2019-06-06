import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'Header';
import PostPage from 'PostPage';
import PostsContainer from 'PostsContainer';
import Footer from 'Footer';
import config from 'config';
import Store from 'Store';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            users: [],
            matchParams: {},
        };
        this.listOfValsToState = Object.keys(this.state); // All (as for now).
        this.store = new Store();

        this.routes = [
            {
                path: '/',
                exact: true,
                render: () => <PostsContainer posts={this.state.posts} store={this.store} />,
            },
            {
                path: '/posts/edit/',
                exact: true,
                render: () => <PostPage users={this.state.users} store={this.store}
                               posts={this.state.posts} />,
            },
            {
                path: '/posts/edit/:id',
                exact: true,
                render: ({ match }) => <PostPage users={this.state.users} store={this.store}
                               posts={this.state.posts} postId={match.params.id} />,
            },
        ];
    }

    componentDidMount() {
        this.store.setSaveCallback((name, value) => {
            if (this.listOfValsToState.includes(name)) {
                const stateChange = {
                    [name]: value,
                };
                this.setState(stateChange);
            }
        });

        // Getting previously saved data.
        this.listOfValsToState.forEach(path => {
            const prevData = this.store.get(path);
            if (prevData) { // At start of session, there are is no data.
                const stateChange = {
                    [path]: this.store.get(path),
                };
                this.setState(stateChange);
            }
        });

        fetch(`${config.dataEndpoint}posts`)
            .then(response => response.json())
            .then(posts => {
                let nextCommentId = 1;
                const updatedPosts = posts.map((post, postIdx) => {
                    nextCommentId = populateMissingValsOfPost(post, postIdx, nextCommentId);
                    return post;
                });
                this.store.set('posts', updatedPosts);
            });

        this.store.set('users', config.users);
    }

    render() {
        return (
            <div className="app">
                <Router>
                    <Header title="Logo" routes={this.routes} store={this.store} matchParams={this.state.matchParams} />
                    <Switch>
                        {computeRoutesElements(this.routes)}
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}

function computeRoutesElements(routes) {
    return routes.map(route => {
        return <Route exact={route.exact} path={[route.path]} render={route.render}
         key={`${route.path}${route.exact}`} /> });
}

/// @returns next comment ID
function populateMissingValsOfPost(post, postIdx, nextCommentId) {
    post['comments'] = [
        { id: nextCommentId++, title: `Comm. title for ${postIdx}: #0`, body: 'Sample comment body 0' },
        { id: nextCommentId++, title: `Comm. title for ${postIdx}: #1`, body: 'Sample comment body 1' },
    ];
    post['id'] = postIdx;
    post['userId'] = postIdx % 3 + 1;
    return nextCommentId;
}

export default App;