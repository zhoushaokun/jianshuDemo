import React, { Component } from 'react';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavRight,
    NavLeft,
    NavItem,
} from "./style";

export default class Header extends Component {
    render() {
        return (
            <HeaderWrapper>
                <Logo></Logo>
                <Nav>
                    <NavLeft>
                        <NavItem>首页</NavItem>
                        <NavItem>下载App</NavItem> 
                    </NavLeft>
                    <NavRight>
                        <NavItem>Aa</NavItem>
                        <NavItem>贝塔</NavItem>
                        <NavItem>登录</NavItem>
                        <NavItem className="border-item">注册</NavItem>
                        <NavItem className="border-item">写文章</NavItem>
                    </NavRight>
                </Nav>
            </HeaderWrapper>  
        )
    }
}
