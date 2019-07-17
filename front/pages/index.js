import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux'
import { LOG_IN, LOG_OUT, loginAction, logoutAction } from '../reducers/user'

const Home = () => {

  const dispatch = useDispatch(); 
  useEffect(()=>{
    dispatch({
      type: 'HELLO_SAGA'
    });
  }, [])

  // const { user, isLoggedIn } = useSelector(state => state.user);
  const user = useSelector(state => state.user.user);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const { mainPosts } = useSelector(state => state.post);

  return (
    <div>
      {user ? <div>로그인 했습니다.: {user.nickname}</div> : <div>로그아웃 했습니다.</div>}
      {isLoggedIn && <PostForm />}
      {mainPosts.map((c) => {
        return (
          <PostCard key={c} post={c} />
        );
      })}
    </div>
  );
};

export default Home;