import SyntaxHighlighter from 'react-syntax-highlighter';
import DiscordLight from "components/syntax_theme"

export function InlineSyntax({ children }) {
  let className
  if (children.startsWith('"')) {
    className = "hljs-string"
  } else if (children.match(/^\d/)) {
    className = "hljs-number"
  } else if (children.startsWith(':')) {
    className = "hljs-symbol"
  } else if (["nil", "true", "false"].includes(children)) {
    className = "hljs-literal"
  }
  return <span className={`${className} font-mono`} key={Math.random()}>{children}</span>
}

export function CodeBlock({ children, language }) {
  return <SyntaxHighlighter language={language} style={DiscordLight} CustomElement={InlineSyntax}>{children}</SyntaxHighlighter>
}