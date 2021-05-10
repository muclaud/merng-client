import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Container>
      <Grid columns={3}>
        <Container>
          {user && (
            <Grid.Row className='page-title'>
              <PostForm />
            </Grid.Row>
          )}
        </Container>
        <Grid.Row className='page-title'>
          <h1>Recent post</h1>
        </Grid.Row>

        <Grid.Row>
          {loading ? (
            <h1>loading post...</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Home;
