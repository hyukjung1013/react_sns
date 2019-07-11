import React from 'react'
import Link from 'next/link'
import LoginForm from './LoginForm'
import UserProfile from './UserProfile'
UserProfile
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from 'antd' 

const dummy = {
    nickname: 'ronaldo',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false,
}

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }}/>
                </Menu.Item>
            </Menu>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {dummy.isLoggedIn ? <UserProfile /> : <LoginForm />}
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