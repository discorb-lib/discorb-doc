function join(sep) {
  if (typeof (sep) == "object") {
    sep = {...sep, key: Math.random()}
  }
  return (a, b) => [a, sep, b]
}

function scrollToElement(element, noSmooth) {
  let elementPosition = element.getBoundingClientRect().top;
  let offsetPosition = elementPosition + window.pageYOffset - 80;
  document.querySelectorAll(".scroll-focus").forEach(el => el.classList.remove("scroll-focus"));
  element.classList.add("scroll-focus")

  window.scrollTo({
    top: offsetPosition,
    behavior: noSmooth ? "auto" : "smooth"
  })
}

function uniqJoin(arr) {
  return [...new Set([].concat(...arr))]
}

function convertToId(method, prefix) {
  let pref
  switch (prefix) {
    case '#':
      pref = 'i'
      break
    case '.':
      pref = 'c'
      break
    case '::':
      pref = 's'
      break
  }
  if (typeof method === 'string') {
    return `${pref}-${method}`
  } else {
    return `${pref}-${method.name}`
  }
}

function captialize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
export {
  join,
  scrollToElement,
  uniqJoin,
  convertToId,
  captialize
}