import React from 'react';
import ReactMarkdown from 'react-markdown';
import { convertToId } from 'common/utils';
import rehypeRaw from 'rehype-raw'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from './syntax';
import files from "db/files"
import {withRouter} from 'next/router'

class Markdown extends React.Component {

  render() {
    let children = this.props.children
    children = children.replaceAll(
      /\{(.+?)\}/g,
      (match, p1, offset) => {
        if ((children.substr(0, offset).match(/```/g)?.length || 0) % 2 == 1) {
          return match
        }
        let href = "/"
        let description = ""
        if (p1.startsWith("file:")) {
          href = "/files/"
          if (p1.includes(" ")) {
            let match = p1.substring(5).match(/^(.+?) (.+)$/)
            href += match[1]
            description = match[2]
          } else {
            href += p1.substring(5)
            description = files[p1.substring(5)]?.title
          }

        } else if (p1.match(/[\.#]/g)) {
          if (p1.split(/[\.#]/)[0].length > 1) {
            href = "/objects/" + p1.split(/[\.#]/)[0].replaceAll("::", "/")
          }
          href += "#" + convertToId(p1.split(/[\.#]/)[1], p1.search(/[\.#]/)[0])
          description = p1
        } else {
          return match
        }
        return `[${description}](${href})`
      }
    )
    return (
      <ReactMarkdown
        className="markdown"
        components={
          {
            a: (props) => {
              if (props.href.match(/^https?:\/\//)) {
                return <a {...props} />
              } else {
                // props.href = 
                let nProps = { ...props }
                delete nProps.children
                console.log(props.href)
                return <Link href={props.href} {...nProps}>{props.children[0]}</Link>
              }
            },

            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')?.[1] || "plaintext"
              return !inline ? (
                <CodeBlock language={match}>{children[0].trim()}</CodeBlock>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }
        }
        rehypePlugins={[rehypeRaw, remarkGfm]}
        transformImageUri={uri => {
          return uri.startsWith("http") ? uri : `${this.props.router.basePath}/${uri}`
        }}
      >
        {children}
      </ReactMarkdown>
    )
  }
}

export default withRouter(Markdown)