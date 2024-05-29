import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const UserInfo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'left', 
  paddingLeft: '10px',
  marginBottom: '0',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
}));

const UserName = styled.span(() => ({
  fontWeight: 'bold',
}));

const UserEmail = styled.span(() => ({
  fontSize: 'smaller', 
  marginLeft: '65px',

}));

const UserAvatar = styled.div(() => ({
  width: '55px',
  height: '55px',
  borderRadius: '50%',
  backgroundColor: '#686D76',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px',
  marginTop: '10px',
}));


const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
  scrollSnapType: 'x mandatory',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  width: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post, user }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const imageWidth = carouselRef.current.querySelector('img').offsetWidth;
      carouselRef.current.scrollBy({
        left: imageWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const imageWidth = carouselRef.current.querySelector('img').offsetWidth;
      carouselRef.current.scrollBy({
        left: -imageWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <UserInfo>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {user && (
            <UserAvatar>
              <span style={{ color: '#fff' }}>
                {user.name.charAt(0).toUpperCase()}
                {user.name.split(' ')[1] && user.name.split(' ')[1].charAt(0).toUpperCase()}
              </span>
            </UserAvatar>
          )}
          <UserName>{user && user.name}</UserName>
        </div>
        <UserEmail>{user && user.email}</UserEmail>
      </UserInfo>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default Post;
