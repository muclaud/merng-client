import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Button, Popup } from 'semantic-ui-react';

function LikeButton({ user, post: { id, likes } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button
        color='teal'
        content='Like'
        icon='heart'
        onClick={likePost}
        label={{
          basic: true,
          color: 'teal',
          pointing: 'left',
          content: '0',
        }}
      />
    ) : (
      <Button
        color='teal'
        basic
        content='Like'
        icon='heart'
        onClick={likePost}
        label={{
          basic: true,
          color: 'teal',
          pointing: 'left',
          content: '0',
        }}
      />
    )
  ) : (
    <Button
      as={Link}
      to='/login'
      color='teal'
      basic
      content='Like'
      icon='heart'
      onClick={likePost}
      label={{
        basic: true,
        color: 'teal',
        pointing: 'left',
        content: '0',
      }}
    />
  );
  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      <Popup
        content={liked ? 'Unlike post' : 'Like post'}
        inverted
        trigger={likeButton}
      />
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
    }
  }
`;
export default LikeButton;
