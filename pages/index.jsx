import Head from 'next/head'
import Markdown from 'components/markdown'
import { promises as fs } from 'fs'
import React from 'react'

export async function getStaticProps({ params }) {
  let content = await fs.readFile(`db/files/README.md`, 'utf8')
  return { props: { content } }
}

export default class Home extends React.Component {
  getPath() {
    return [""]
  }
  render() {
    const { content } = this.props
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <Head>
            <title>File: README.md</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="w-full flex-1 px-20 sm:px-10">
            <Markdown>{content}</Markdown>
          </main>
        </div>
      </div>
    )
  }
}