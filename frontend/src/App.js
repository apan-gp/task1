import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'Header';
import AddPostPage from 'AddPostPage';
import PostsContainer from 'PostsContainer';
import Footer from 'Footer';
import config from 'config';
import Store from 'Store';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.listOfValsToState = ['posts', 'users'];
        this.state = {
            posts: [],
            users: [],
        };
        this.store = new Store();

        this.routes = [
            {
                path: '/',
                exact: true,
                render: () => <PostsContainer posts={this.state.posts} store={this.store} />,
                breadcrumbs: [
                    { path: '/', text: 'Main page' },
                ],
            },
            {
                path: '/posts/edit/',
                exact: true,
                render: ({ match }) => <AddPostPage users={this.state.users} store={this.store}
                                                    posts={this.state.posts} postId={null} />,
                breadcrumbs: [
                    { path: '/', text: 'Main page' },
                    { path: '/posts/edit/', text: 'Edit post' },
                ],
            },
            {
                path: '/posts/edit/:id',
                exact: false,
                render: ({ match }) => <AddPostPage users={this.state.users} store={this.store}
                               posts={this.state.posts} postId={match.params.id} />,
                breadcrumbs: [
                    { path: '/', text: 'Main page' },
                    { path: '/posts/edit/', text: 'Edit post' },
                ],
            },
        ];
    }

    componentDidMount() {
        this.store.setSaveCallback((name, value) => {
            if (this.listOfValsToState.includes(name)) {
                let stateChange = {};
                stateChange[name] = value;
                this.setState(stateChange);
            }
        });

        // Getting previously saved data.
        this.listOfValsToState.forEach(path => {
            const prevData = this.store.get(path);
            if (prevData) { // At start of session, there are is no data.
                const stateChange = {};
                stateChange[path] = this.store.get(path);
                this.setState(stateChange);
            }
        });

        fetch(`${config['data-endpoint']}posts`)
            .then(response => response.json())
            .then(posts => {
                let currPostIdx = 1;
                const updatedPosts = posts.map(post => {
                    post['comments'] = [
                        { title: `Comm. title for ${currPostIdx} 0`, body: 'Sample comment body 0' },
                        { title: `Comm. title for ${currPostIdx} 1`, body: 'Sample comment body 1' },
                    ];
                    post['id'] = currPostIdx;
                    post['userId'] = currPostIdx % 3 + 1;
                    ++currPostIdx;
                    return post;
                });
                this.store.set('posts', updatedPosts);
            });

        this.store.set('users', [
            { id: 1, name: 'Królowa śniegu' },
            { id: 2, name: 'Brązowy cukier' },
            { id: 3, name: 'Mitsubishi' },
        ]);
    }

    render() {
        return (
            <div className="app">
                <Router>
                    <Header title="Logo" routes={this.routes} />
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
         key={`${route.path}${route.exact.toString()}`} /> });
}

export default App;