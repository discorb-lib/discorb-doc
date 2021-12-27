import { InlineSyntax, CodeBlock } from 'components/syntax'
import Markdown from 'components/markdown'
import React from 'react'
import { join, uniqJoin, scrollToElement, convertToId } from 'common/utils'
import { PermalinkBase, CollapseArrow, AsyncIcon, TreeIcon } from "components/icon_button"
import Link from 'next/link'

export function scrollToMethod(element, noSmooth) {
  if (element.classList.contains("alias")) {
    element = element.parentElement.parentElement.querySelector(".method-syntax")
  }
  scrollToElement(element, noSmooth)
}
function YardBoxes({ type, source, cls }) {
  if (typeof source === "undefined" || source.length === 0) return null
  let baseColor, borderColor, divideColor
  switch (type) {
    case "note":
      baseColor = "bg-dgreen/30"
      borderColor = "border-dgreen"
      divideColor = "divide-dgreen/50"
      break
    case "deprecated":
      baseColor = "bg-dred/30"
      borderColor = "border-dred"
      divideColor = "divide-dred/50"
      break
    case "todo":
      baseColor = "bg-dblue/30"
      borderColor = "border-dblue"
      divideColor = "divide-dblue/50"
      break
    case "abstract":
      baseColor = "bg-dgray/30"
      borderColor = "border-dgray"
      divideColor = "divide-dgray/50"
      type = "Note"
      break
    case "example":
      baseColor = "bg-dgray/30"
      borderColor = "border-dgray"
      divideColor = "divide-dgray/50"
      return (
        <div className={`border-1 border-l-8 rounded my-2 p-2 ${borderColor} ${baseColor}`}>
          <strong className="capitalize">Example:</strong>
          <div className={`grid grid-cols-1 divide-y my-1 space-y-1 ml-2 ${divideColor}`}>
            <CodeBlock language="ruby">{source}</CodeBlock>
          </div>

        </div>
      )
    case "see_also":
      baseColor = "bg-dgray/30"
      borderColor = "border-dgray"
      divideColor = "divide-dgray/50"
      return (
        <div className={`border-1 border-l-8 rounded my-2 p-2 ${borderColor} ${baseColor}`}>
          <strong className="capitalize">See also:</strong>
          <div className={`grid grid-cols-1 divide-y my-1 space-y-1 ml-2 ${divideColor}`}>
            {
              source.map(([url, description]) => {

                let href = ""
                if (url.match(/^https?:\/\//)) {
                  href = url
                } else if (url.startsWith("file:")) {
                  href = "../".repeat(cls.namespace.length) +
                    "../file/" +
                    url.substring(5)

                } else {
                  if (url.split(/[\.#]/)[0].length > 1) {
                    href = "../".repeat(cls.namespace.length) +
                      url.split(/[\.#]/)[0].replaceAll("::", "/")
                  }
                  if (url.match(/[\.#]/g)) {
                    href += "#" + convertToId(url.split(/[\.#]/)[1], url.search(/[\.#]/)[0])
                  }
                  description = url
                }
                return (
                  <Link key={url} href={href} className="text-dlink">{description}</Link>
                )
              })
            }
          </div>

        </div>
      )
  }
  return (
    <div className={`border-1 border-l-8 rounded my-2 p-2 ${borderColor} ${baseColor}`}>
      <strong className="capitalize">{type}:</strong>
      <div className={`grid grid-cols-1 divide-y my-1 space-y-1 ml-2 ${divideColor}`}>
        {source.map(item =>
          <Markdown cls={cls}>{item}</Markdown>
        )}
      </div>

    </div>
  )
}
export function YardDescription({ source, cls, from }) {
  return (
    <>
      <Markdown cls={cls}>{source.text}</Markdown>
      <YardBoxes type="note" source={source.notes} cls={cls} />
      <YardBoxes type="deprecated" source={source.deprecated} cls={cls} />
      <YardBoxes type="todo" source={source.todo} cls={cls} />
      <YardBoxes type="abstract" source={cls.abstract && from == "class" ? ["This class is abstract."] : []} cls={cls} />
      <YardBoxes type="example" source={source.example} cls={cls} />
      <YardBoxes type="see_also" source={source.see_also} cls={cls} />
    </>
  )
}

class Permalink extends PermalinkBase {
  getId() {
    return convertToId(this.props.method, this.props.prefix)
  }
}

class CollapsedItem extends React.Component {
  jumpToMethod = () => {
    const target = document.getElementById(convertToId(this.props.method, this.props.prefix))
    if (target.parentElement.parentElement.classList.contains("hidden")) {
      target.parentElement.parentElement.parentElement.querySelector(".collapse-arrow").click()
    }
    location.hash = convertToId(this.props.method, this.props.prefix)
    scrollToMethod(target)

  }
  render() {
    if (this.props.method.parent[0]) {
      return (
        <span className="p-1 px-2 m-1 font-mono rounded bg-slate-200 cursor-pointer" onClick={this.jumpToMethod}>
          <span className="text-neutral-500">{this.props.prefix}</span>
          <span className="text-dteal">{this.props.method.name}</span>
        </span>
      )
    } else {

      return (
        <span className="p-1 px-2 m-1 font-mono rounded bg-slate-100 cursor-pointer" onClick={this.jumpToMethod}>
          <span className="text-neutral-500">{this.props.prefix}</span>
          <span className="text-dteal">{this.props.method.name}</span>
        </span>
      )

    }
  }
}

function ConstItem({ item, prefix, noBrackets, cls }) {
  return (
    <div className="py-2">
      <div className="bg-gray-100 rounded font-mono p-1 px-2 mb-2 border-slate-300 border-1 method-syntax" id={convertToId(item, "::")}>
        <Permalink method={item} prefix="::" />
        <span className="text-neutral-500">::</span>
        <span className="text-dteal">{
          item.name
        }</span>
        <span className="text-dlight_grey"> -&gt; </span>
        <span className="text-dblue">{item.class}</span>
      </div>
      <YardDescription source={item.docstring} cls={cls} />
      <h3 className="text-2xl mt-2">Source</h3>
      <CodeBlock language="ruby">{item.source}</CodeBlock>
    </div>
  )
}

function MethodItem({ method, prefix, noBrackets, cls }) {
  return (
    <div className="py-2">
      <MethodSyntax method={method} prefix={prefix} noBrackets={noBrackets} cls={cls} />

      <MethodDescription method={method} noBrackets={noBrackets} prefix={prefix} cls={cls} />
    </div>
  )
}

function MethodSyntax({ method, prefix, noBrackets, cls }) {
  return (
    <div className="bg-gray-100 rounded font-mono p-1 px-2 mb-2 border-slate-300 border-1 method-syntax" id={convertToId(method, prefix)}>
      <Permalink method={method} prefix={prefix} />

      {
        method.flags?.async && <AsyncIcon />
      }
      {
        !method.parent?.[0] && <TreeIcon cls={cls} method={method} prefix={prefix} />
      }
      <span className="text-neutral-500">{prefix}</span>
      <span className="text-dteal">{
        method.name
      }</span>
      {!noBrackets &&
        [
          <span className="text-ddark_gold">(</span>,
          <span>{
            method.params.length > 0 && method.params
              .map(item => (<MethodParameter key={item.name} item={item} />))
              .reduce(join(<span>{"\u200b"}, </span>))
          }</span>,
          <span className="text-ddark_gold">)</span>
        ]
      }
      {method.returns.length > 0 && (
        [
          <span className="text-dlight_grey"> -&gt; </span>,
          <MethodType cls={uniqJoin(method.returns.map(r => r.class))} required={true} />
        ]
      )}
    </div>
  )
}

function MethodParameter({ item }) {
  switch (item.type) {
    case 'positional':
      return (
        <span key={item.name}>
          <MethodType cls={item.class} required={item.required} />{" "}
          <span className={item.required ? "text-dorange" : "text-ddark_orange"}>{item.name}</span>
          {item.default && (
            <span className="text-dlight_grey"> = <InlineSyntax>{item.default}</InlineSyntax></span>
          )}
        </span>
      )
    case 'keyword':
      return (
        <span key={item.name}>
          <MethodType cls={item.class} required={item.required} />{" "}
          <span className={item.required ? "text-dorange" : "text-ddark_orange"}>{item.name}:</span>
          {item.default && (
            [" ", <InlineSyntax>{item.default}</InlineSyntax>]
          )}
        </span>
      )
    case 'block':
      return (
        <span key={item.name}>
          <span className="text-dblue">&amp;</span>
          <span className={item.required ? "text-dorange" : "text-ddark_orange"}>block</span>
        </span>
      )
  }
}

function MethodDescription({ method, noBrackets, prefix, cls }) {
  return (
    <>
      {method.aliases?.length > 0 && (
        <span className="text-neutral-500">Also known as: {method.aliases.map(alias => (
          <span className="font-mono text-neutral-800 alias" key={alias} id={convertToId(alias, prefix)}>{alias}</span>
        )).reduce(
          join(", ")
        )}{!method.parent[0] && <br />}</span>
      )}
      {!method.parent[0] && (
        <span className="text-neutral-500">Defined in:{" "}
          <a
            className="font-mono text-neutral-800"
            href={
              `${"../".repeat(cls.namespace.length)}${method.parent[1].join("/")}#${convertToId(method, prefix)}`
            }
          >{method.parent[1].join("::")}</a>
        </span>
      )}
      <YardDescription source={method.docstring} cls={cls} />
      {!noBrackets && <MethodParameterDescription method={method} cls={cls} />}
      <MethodReturnDescription method={method} cls={cls} />
    </>
  )
}

function MethodParameterDescription({ method, cls }) {
  return (
    <div>
      <h3 className="text-2xl mt-2">Parameters</h3>
      {
        method.params.length === 0 ? (
          <div>No parameters</div>
        ) : (
          method.params.map(param => (
            <NamedTypeDescription
              key={param.name}
              name={param.type == "block" ? "block" : param.name}
              cls={param.class}
              required={param.required}
              type={param.type}
              description={param.description}
              method={method}
              mcls={cls} />
          ))
        )
      }
    </div>
  )
}

function MethodReturnDescription({ method, cls }) {
  return (
    <div>
      <h3 className="text-2xl mt-2">Returns</h3>
      {
        method.returns.length === 0 ? (
          <div>No Return Values</div>
        ) : (
          method.returns.map((ret, i) => (
            <NamedTypeDescription
              key={i}
              name={null}
              cls={ret.class}
              required={true}
              description={ret.description}
              method={method}
              mcls={cls}
            />
          ))
        )
      }
    </div>
  )
}
function NamedTypeDescription({ name, cls, required, type, description, method, mcls }) {
  return (
    <div>
      <span className="font-mono">
        {name && (
          [<strong className={required ? "text-dorange" : "text-ddark_orange"}>
            {name}
          </strong>, ": "])}<MethodType cls={type == "block" ? ["Proc"] : cls} required={required} />
      </span><br />
      <div className="pl-4"><Markdown method={method} cls={mcls}>{description}</Markdown></div>
    </div>
  )
}

function MethodType({ cls, required }) {
  let classes
  if (!cls) {
    cls = ["void"]
  }

  classes = cls.join(" | ")
  if (!required) {
    if (cls.length == 1) {
      classes = `?` + classes
    } else {
      classes = `?(${classes})`
    }
  }

  return (<span className="text-dblue font-mono">{classes}</span>)

}

export function Overview({ docstring, cls }) {
  return (

    <div className="py-2">
      <h2 className="text-3xl">Overview</h2>
      <YardDescription source={docstring} cls={cls} from="class" />
      {(cls.children.classes.length > 0 || cls.children.classes.length > 0) && (<>
        <h3 className="text-xl mt-2">Defined Under Namespace</h3>
        {cls.children.classes.length > 0 && (<>
          <strong>Classes:</strong>
          <div className="pl-4">{cls.children.classes.map(c => (
            <Link key={c} href={[...cls.namespace, c].join("/")}><a className="font-mono text-dlink">{c}</a></Link>
          )).reduce(join(<span>, </span>))}</div>
        </>)}
        {cls.children.modules.length > 0 && (<>
          <strong>Modules:</strong>
          <div className="pl-4">{cls.children.modules.map(c => (
            <Link key={c} href={[...cls.namespace, c].join("/")}><a className="font-mono text-dlink">{c}</a></Link>
          )).reduce(join(<span>, </span>))}
          </div>
        </>)}
      </>)}
    </div>
  )
}

export function MethodContainer({ methods, name, prefix, noBrackets, type, cls }) {
  if (!methods || methods.length === 0) {
    return null
  }
  return (
    <div className="py-2">
      <h2 className="text-3xl">{name}{methods.length !== 0 && (<CollapseArrow methods={methods} prefix={prefix} />)}</h2>
      {methods.length === 0 ? (
        <div>No {name}</div>
      ) : (
        [
          <div className="grid grid-cols-1 divide-y method-full">
            {methods.map(method => (
              type == "const" ?
                <ConstItem key={method.name} item={method} cls={cls} /> :
                <MethodItem key={method.name} method={method} prefix={prefix} noBrackets={noBrackets} cls={cls} />
            ))}
          </div>,
          <div className="method-collapsed hidden mt-2 w-full">
            <div className="flex flex-wrap">
              {methods.map(method => (
                <CollapsedItem key={method.name} method={method} prefix={prefix} />
              ))}
            </div>
          </div>
        ]
      )}
    </div>
  )
}