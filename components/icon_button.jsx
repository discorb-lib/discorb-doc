import Icon from '@mdi/react'
import React from 'react'
import { mdiChevronDown, mdiLinkVariant, mdiClockOutline, mdiFileTree } from '@mdi/js';
import { scrollToElement, convertToId } from "common/utils";

export class CollapseArrow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moving: false,
    }
  }

  toggleCollapse = (e) => {
    if (this.state.moving) return
    this.setState({ moving: true })
    let button = e.target
    while (!button.tagName.toLowerCase().includes("button")) {
      button = button.parentElement
    }
    const collapsed = button.parentElement.parentElement.querySelector('.method-collapsed')
    const open = button.parentElement.parentElement.querySelector('.method-full')
    if (collapsed.classList.contains('hidden')) {
      collapsed.classList.remove('hidden')
      open.classList.add('hidden')
      button.animate([
        { transform: 'rotateX(0deg)' },
        { transform: 'rotateX(180deg)' }
      ], {
        duration: 100,
        iterations: 1,
        fill: 'forwards'
      }).finished.then(() => {
        this.setState({ moving: false })
      })
    } else {
      open.classList.remove('hidden')
      collapsed.classList.add('hidden')
      button.animate([
        { transform: 'rotateX(180deg)' },
        { transform: 'rotateX(0deg)' }
      ], {
        duration: 100,
        iterations: 1,
        fill: 'forwards'
      }).finished.then(() => {
        this.setState({ moving: false })
      })
    }
  }

  render() {
    return (
      <button className="float-right collapse-arrow" onClick={this.toggleCollapse}>
        <Icon path={mdiChevronDown} size={1.75} />
      </button>
    )
  }
}

export class PermalinkBase extends React.Component {
  handleClick = (e) => {
    window.history.pushState(null, null, `#${this.getId()}`)
    scrollToElement(document.getElementById(this.getId()))
  }
  render() {
    return (<HoverIcon path={mdiLinkVariant} onClick={this.handleClick} title="Permalink" />)
  }
}
function HoverIcon({ path, onClick, href, title }) {
  return (
    <a onClick={onClick} href={href} className="inline-block align-text-top text-dlighter_gray cursor-pointer hover:text-ddark_grey" title={title}>
      <Icon path={path} size={0.8} />
    </a>
  )
}
export function AsyncIcon() {
  return (
    (<HoverIcon path={mdiClockOutline} title="Asynchronous" />)
  )
}
export function TreeIcon({ cls, method, prefix }) {
  let href = "../".repeat(cls.namespace.length - 1) +
    method.parent[1].join("/") +
    "#" +
    convertToId(method.name, prefix)
  return (
    (<a href={href}>
      <HoverIcon path={mdiFileTree} title="Defined in other classes/modules" />
    </a>)
  )
}