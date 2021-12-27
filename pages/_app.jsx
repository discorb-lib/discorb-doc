import 'styles/globals.scss'
import 'styles/syntax.css'

import SideBar from 'components/sidebar'

function DiscorbDoc({ Component, pageProps }) {
  return <>
    <SideBar />
    <div className="w-full box-border lg:pl-96 top-0 relative">
      <Component {...pageProps} />
    </div>
    <footer className="py-3 bg-slate-100 text-center">Generated with YARD, Next.js, and Tailwind CSS.</footer>
  </>
}


export default DiscorbDoc
