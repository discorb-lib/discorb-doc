import Head from 'next/head'
import React from 'react'
import { MethodContainer, Overview, scrollToMethod } from 'components/methods'
import { join, captialize } from "common/utils"
import { promises as fs } from 'fs'

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`)
  // const post = await res.json()
  const data = JSON.parse(await fs.readFile(`db/object/${params.namespace.join("/")}.json`, 'utf8'))
  // Pass post data to the page via props
  return { props: { data } }
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const data = JSON.parse(await fs.readFile(`db/namespaces.json`, 'utf8'))
  return {
    paths: data.map(m => ({ params: { namespace: m } })),
    fallback: false,
  }
}

function ClassLink({ index, items, children }) {
  let link = items.slice(0, index + 1).join("/")
  link = "../".repeat(items.length - index - 1) + link
  return (<a href={link}>{children}</a>)
}

export default class Class extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      if (location.hash.length > 1) {
        const target = document.getElementById(location.hash.substring(1))
        if (target) {
          scrollToMethod(target, true)
        }
      }
    }, 0)
  }
  getPath() {
    const { data } = this.props
    return ["objects"].concat(data.namespace)
  }
  render() {
    const { data } = this.props
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>{captialize(data.type)}: {data.namespace.join("::")}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="w-full flex-1 px-20 sm:px-10">
          <h1 className="text-4xl"><span className="capitalize">{data.type}</span>: <span className="font-mono">{
            data.namespace
              .map((name, index) => (<span className="text-neutral-800 last:text-dblurple" key={name}>
                <ClassLink index={index} items={data.namespace}>{name}</ClassLink>
              </span>))
              .reduce(join(<span className="text-neutral-500">::</span>))
          }</span></h1>
          <div className="grid grid-cols-1 border-y divide-y divide-slate-400 border-slate-400">
            <Overview docstring={data.docstring} cls={data} />
            <MethodContainer methods={data.consts} name="Constants" prefix="::" noBrackets={true} type="const" cls={data} />
            <MethodContainer methods={data.iattrs} name="Instance Attributes" prefix="#" noBrackets={true} cls={data} />
            <MethodContainer methods={data.imethods} name="Instance Methods" prefix="#" noBrackets={false} cls={data} />
            {data.type === "class" && (<MethodContainer methods={data.cmethods} name="Class Methods" prefix="." noBrackets={false} cls={data} />)}
          </div>
        </main>

      </div>
    )
  }
}
