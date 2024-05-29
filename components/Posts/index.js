import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [users, setUsers] = useState({});

  const { isSmallerDevice } = useWindowWidth();
  const limit = isSmallerDevice ? 5 : 10;

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: fetchedPosts } = await axios.get('/api/v1/posts', {
        params: { start: startIndex, limit },
      });
      setPosts(fetchedPosts);
      setStartIndex(startIndex + fetchedPosts.length);
      setHasMorePosts(fetchedPosts.length === limit);
      fetchUsersData(fetchedPosts);
    };

    fetchPosts();
  }, [isSmallerDevice]);

  const fetchUsersData = async (fetchedPosts) => {
    const userIds = fetchedPosts.map(post => post.userId);
    const usersData = await Promise.all(
      userIds.map(async userId => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return data;
      })
    );
    const usersMap = usersData.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
    setUsers(usersMap);
  };

  const handleClick = async () => {
    setIsLoading(true);
    const { data: fetchedPosts } = await axios.get('/api/v1/posts', {
      params: { start: startIndex, limit },
    });
    setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
    setStartIndex(startIndex + fetchedPosts.length);
    setHasMorePosts(fetchedPosts.length === limit);
    fetchUsersData(fetchedPosts);
    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} user={users[post.userId]} />
        ))}
      </PostListContainer>

      {hasMorePosts && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
