// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import NewsPaperIcon from './icons/newspaper'
import UserIcon from './icons/user'
import GearIcon from './icons/gear'
import PlusIcon from './icons/plus'
import { color } from '../../constants/styles'

const SCIcon = styled.div`
  width: 30px;
  margin: 1px auto;
`

const SCUl = styled.ul`
  color: ${color.headerLightWhite};
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
`

const SCLi = styled.li`
  position: relative;
  flex: 1;
  align-items: initial;
  text-align: center;
  font-weight: 300;
  display: flex;
  svg {
    fill: ${color.headerLightWhite};
  }
  > a {
    color: ${color.headerLightWhite} !IMPORTANT;
    justify-content: center;
    flex: 1;
    padding: 10px;
    &.active {
      color: #FFF !IMPORTANT;
      background-color: ${color.headerLightBlack};
      svg {
        fill: #FFF;
      }
    }
    > div {
      position: relative;
      z-index: 1;
    }
  }
`

const SCLiSpecial = styled(SCLi)`
  > a {
    .header-menu__icon {
      top: 3px;
      display: initial;
      svg {
        width: 55px;
      }
    }
    .header-menu__label {
      display: none;
    }
    &.active {
      &:before {
        background-color: #135079;
      }
    }
    &:before {
      content: "";
      position: absolute;
      background-color: ${color.darkBlue};
      width: 90px;
      height: 90px;
      left: 50%;
      top: 0rem;
      border-radius: 100%;
      z-index: 0;
      transform: translateX(-50%)
    }
  }
`

type menuType = {
  label: string,
  to: string,
  icon: any,
  special?: boolean
}

class HeaderMenu extends Component {
  props: {
    list: menuType[]
  }

  static defaultProps = {
    list: [
      {
        label: 'Home',
        icon: <NewsPaperIcon/>,
        to: '/'
      },
      {
        label: 'Profile',
        icon: <UserIcon/>,
        to: '/profile'
      },
      {
        label: 'Add Post',
        icon: <PlusIcon/>,
        to: '/add_post',
        special: true
      },
      {
        label: 'Post',
        icon: <UserIcon/>,
        to: '/post'
      },
      {
        label: 'Settings',
        icon: <GearIcon/>,
        to: '/settings'
      }
    ]
  }

  renderMenu (option: menuType) {
    const {
      label,
      to,
      icon,
      special = false
    } = option

    let props = {}
    let Li = SCLi

    if (special) {
      Li = SCLiSpecial
      props = Object.assign({}, props, {
        'data-special': true
      })
    }

    return (
      <Li {...props} key={`header-menu__${label.toUpperCase()}--${to.toUpperCase()}`}>
        <NavLink exact to={to}>
          <SCIcon className="header-menu__icon">
            {icon}
          </SCIcon>
          <div className="header-menu__label">
            {label}
          </div>
        </NavLink>
      </Li>
    )
  }

  render () {
    return (
      <SCUl className="header-menu">
        { this.props.list.map(item => this.renderMenu(item)) }
      </SCUl>
    )
  }
}

export default HeaderMenu
