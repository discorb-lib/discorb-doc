import Head from 'next/head'
import React from 'react'
import Markdown from "components/markdown"
import { promises as fs } from 'fs'
import { join } from 'common/utils'

export async function getStaticProps({ params }) {
  let data = JSON.parse(await fs.readFile(`db/files.json`, 'utf8'))
  let name = params.filename.join("/")
  if (!name.match(/\.md$/)) {
    name += ".md"
  }
  data = data[name]
  let content = await fs.readFile(`db/files/${name}`, 'utf8')
  // Pass post data to the page via props
  return { props: { path: name, data, content } }
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const data = JSON.parse(await fs.readFile(`db/files.json`, 'utf8'))
  return {
    paths: (
      [].concat(
        Object.keys(data).map(m => ({ params: { filename: m.split("/") } })),
        Object.keys(data).map(m => ({ params: { filename: m.replace(/\.md$/, "").split("/") } }))
      )
    ),
    fallback: false,
  }
}
export default class File extends React.Component {
  getPath(){
    return ["files"].concat(this.props.path)
  }
  render() {
    const { path, data, content } = this.props
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>File: {data.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="w-full flex-1 px-20 sm:px-10">
          <div className="py-1">
            {["Files", data.title]
            .map(
              (m, i) => (
              <span key={i} className="text-neutral-800 last:text-dblurple">{m}</span>
            )).reduce(
              join(<span className="text-neutral-500">&gt;</span>)
            )}
          </div>
          <Markdown path={path.split("/")}>{content}</Markdown>
        </main>
      </div>
    )
  }
}
