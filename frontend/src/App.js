import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'Header';
import PostPage from 'PostPage';
import PostsContainer from 'PostsContainer';
import Footer from 'Footer';
import config from 'config';
import Store from 'Store';
import './App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: [],
      matchParams: {},
    };
    this.store = new Store();
    this.store.setSaveCallback((name, value) => {
      if (name in this.state) {
        const stateChange = {
          [name]: value,
        };
        this.setState(stateChange);
      }
    });
  }

  componentDidMount() {
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
          <Header title="Logo" routes={this.routes} store={this.store} className="app__section"
                  matchParams={this.state.matchParams}/>
          <Switch>
            <Route exact={true} path='/' render={
              () => <PostsContainer posts={this.state.posts} store={this.store} className="app__section"
              />
            }/>
            <Route exact={true} path='/posts/add/' render={
              () => <PostPage users={this.state.users} store={this.store} posts={this.state.posts}
                              className="app__section"/>
            }/>
            <Route exact={true} path='/posts/edit/:id' render={
              ({ match }) => <PostPage users={this.state.users} store={this.store}
                                       posts={this.state.posts} postId={match.params.id} className="app__section"
              />
            }/>
          </Switch>
          <Footer className='app__section'/>
        </Router>
      </div>
    );
  }
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
