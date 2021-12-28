import React from "react";
import namespaces from "db/namespaces";
import files from "db/files";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import { useRouter, withRouter } from 'next/router';
import Link from "next/link";
function arrayStartsWith(a, b) {
  return a.length >= b.length && a.slice(0, b.length).every((v, i) => v == b[i])
}
function getLastElement(a) {
  return a[a.length - 1]
}
class ObjectTree extends React.Component {
  toggleChild = (e) => {
    let target = e.target
    while (target.tagName.toLowerCase() !== "span") {
      target = target.parentElement
    }
    const svg = target.querySelector("svg")
    let targets = target.parentElement.querySelectorAll(`.tree-container.level-${this.props.level + 1}`);
    if (targets.length === 0) { return }
    targets.forEach(t => {
      t.classList.toggle("hidden")
    })

    if (targets[0].classList.contains("hidden")) {
      svg.style.transform = "rotate(0deg)"
    } else {
      svg.style.transform = "rotate(90deg)"
    }
  }
  getPath = (path, newPath) => {
    return "../".repeat(path.length) + newPath.join("/")
  }
  render() {
    const { child, level, path } = this.props;
    return (

      child.map((item) => {
        let children = namespaces.filter(
          n => arrayStartsWith(n, item) && n.length == level + 1
        ).sort()
        let isShown = level != 1 && path[level + 1] != getLastElement(item)
        return (

          <div className={
            `${isShown && "hidden"} \
            ${level == 1 ? "pl-2" : "pl-4"} tree-container level-${level}`
          }>
            <span onClick={this.toggleChild}>
              <Icon path={mdiChevronRight} size={0.75} className={
                `inline ${children.length == 0 && "opacity-0"} transition-transform duration-75 cursor-pointer`
              } />
            </span>
            <Link href={`/objects/${item.join("/")}`}>{getLastElement(item)}</Link>
            {children.length > 0 && (
              <ObjectTree path={path} child={children} level={level + 1} />
            )}
          </div>

        )
      })
    )
  }
}
function FileList({ path }) {
  return (
    <>
      {
        Object.entries(files).map(([file, data]) => (
          <div className="pl-4">
            <Link href={`/files/${file}`} key={file}>{data.title}</Link>
          </div>
        ))
      }
    </>
  )
}
function VersionList({  }) {
  const router = useRouter()
  
  if (!process.env.NEXT_PUBLIC_VERSIONS) {
    return (
      <div className="pl-4">??????</div>
    )
  }
  return (
    <>
      {
        process.env.NEXT_PUBLIC_VERSIONS.split(":").map((version) => (
          <div className="pl-4">
            <a href={`/${version == "latest" ? "." : version}`} key={version}>{version}</a>
          </div>
        ))
      }
    </>
  )
}
class SideBar extends React.Component {
  togglePage = (e) => {
    let target = e.target;
    if (target.tagName.toLowerCase() === "div") {
      return
    }
    while (target.tagName.toLowerCase() !== "span") {
      target = target.parentElement
    }
    const sideBar = target.parentElement.parentElement.parentElement
    const targetPage = [...target.classList].filter(c => c.startsWith("t-"))[0].substr(2)
    const tabSelectors = Array.from(sideBar.querySelectorAll(".tab-selector"))
    const tabContents = Array.from(sideBar.querySelectorAll(".tab-content"))
    tabSelectors.forEach((t, i) => {

      if (t.classList.contains("t-" + targetPage)) {
        t.classList.add("border-dblurple")
        t.classList.add("text-dblurple")
        t.classList.remove("border-transparent")
        tabContents[i].classList.remove("hidden")
      } else {
        t.classList.remove("border-dblurple")
        t.classList.remove("text-dblurple")
        t.classList.add("border-transparent")
        tabContents[i].classList.add("hidden")
      }
    })

  }
  render() {
    const { router } = this.props
    let status
    let path = router.asPath
    let prevPath = null
    while (!status) {

      if (path.startsWith("/objects")) {
        status = "objects"
      } else if (path.startsWith("/files")) {
        status = "files"
      } else if (path == "/") {
        status = "root"
      } else if (prevPath == path) {
        status = "404"
      }

      prevPath = path
      path = path.substring(path.indexOf("/", 1))

    }
    path = path.substring(1).split("/")

    return (
      <aside className="w-96 -translate-x-full lg:-translate-x-0 box-border fixed h-screen z-10">
        <div className="bg-slate-200 px-4 py-2 h-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Discorb</h1>
          </div>
          <div className="flex" onClick={this.togglePage}>
            <span className={`flex-auto mx-4 w-1/3 text-center border-b-2 tab-selector t-objects ${status != "files" ? "border-dblurple text-dblurple" : "border-transparent"}`}>Objects</span>
            <span className={`flex-auto mx-4 w-1/3 text-center border-b-2 tab-selector t-files ${status == "files" ? "border-dblurple text-dblurple" : "border-transparent"}`}>Files</span>
            <span className={`flex-auto mx-4 w-1/3 text-center border-b-2 tab-selector t-versions border-transparent`}>Versions</span>
          </div>
        </div>
        <div className={`bg-slate-100 h-full box-border flex flex-col overflow-scroll tab-content objects ${status == "files" && "hidden"}`}>
          <ObjectTree path={path} child={namespaces.filter(n => n.length == 1)} level={1} />
        </div>
        <div className={`bg-slate-100 h-full box-border flex flex-col overflow-scroll tab-content files ${status != "files" && "hidden"}`}>
          <FileList path={path} />
        </div>
        <div className={`bg-slate-100 h-full box-border flex flex-col overflow-scroll tab-content files ${status != "files" && "hidden"}`}>
          <VersionList path={path} />
        </div>
      </aside>
    )
  }
}
export default withRouter(SideBar);