import styled from "styled-components";
import logoPic from "../../static/img/logo.png";

export const HeaderWrapper = styled.div`
    height: 56px;
    border-bottom: 1px solid #ddd;
    position: relative;
    min-width: 1060px;
`;
export const Logo = styled.div.attrs({
    href: '/'
    /*根路径*/ 
})`
    height: 56px;
    float: left;
    /* position: absolute;
    top: 0;
    left: 0; */
    /* width: 100px; */
    width: 10%;
    background-image: url(${logoPic});
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
`;
export const Nav = styled.div`
    /* width: 960px; */
    width: 90%;
    height: 56px;
    float: left;
`;
export const NavLeft = styled.div`
    width: 20%;
    height: 100%;
    float: left;
`;
export const NavRight = styled.div`
    width: 50%;
    height: 100%;
    float: left;
`;
export const NavItem = styled.span`
    display: inline-block;
    padding: 6px 12px;
    margin: 11px 6px 0 10px;
    font-size: 15px;
    &.border-item {
        /* background-color: green; */
        border: 1px solid #ea6f5a;
        border-radius: 14px;
        float: right;
        margin-right: 20px;
    }
`;

export const SearchInput = styled.input.attrs({
    placeholder: "搜索"
})`
    border: none;
	outline: none;
    border-radius: 18px;
    padding: 0 30px 0 20px;
    width: 20%;
    float: left;
    background: #eee;
    height: 36px;
`;