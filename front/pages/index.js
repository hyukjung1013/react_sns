import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { connect } from 'react-redux'
import { LOG_IN, LOG_OUT, loginAction, logoutAction } from '../reducers/user'

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번째 게시글',
    img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
  }],
};

const Home = ({ user, dispatch, login, logout }) => {

  useEffect(() => {
    login();
    logout();
    login();
  }, [])

  return (
    <div>
      {user ? <div>로그인 했습니다.: {user.nickname}</div> : <div>로그아웃 했습니다.</div>}
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map((c) => {
        return (
          <PostCard key={c} post={c} />
        );
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(loginAction),
    logout: () => dispatch(logoutAction),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);