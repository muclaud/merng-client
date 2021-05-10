import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, Confirm, Popup } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        let newData = [...data.getPosts];
        newData = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: {
              newData,
            },
          },
        });
      }

      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  return (
    <>
      <Popup
        content={commentId ? 'Delete comment' : 'Delete post'}
        inverted
        trigger={
          <Button
            color='red'
            floated='right'
            icon='trash'
            name='trash'
            onClick={() => setConfirmOpen(true)}
          />
        }
      />

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default DeleteButton;
