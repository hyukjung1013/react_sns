import React, { useEffect } from 'react'
import Link from 'next/link'
import LoginForm from '../containers/LoginForm'
import UserProfile from '../containers/UserProfile'
import { useSelector } from 'react-redux' 
import { Menu, Input, Button, Row, Col } from 'antd' 
import Router from 'next/router';
 
const AppLayout = ({ children }) => {
    const { isLoggedIn, me } = useSelector( state => state.user );

    const onSearch = (value) => {
        Router.push({ pathname: '/hashtag', query: { tag: value }}, `/hashtag/${value}`);
    }

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile" prefetch><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search 
                        enterButton 
                        style={{ verticalAlign: 'middle' }}
                        onSearch={onSearch}
                    />
                </Menu.Item>
            </Menu>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>

                </Col>
            </Row>
        </div>
    );
};

export default AppLayout;