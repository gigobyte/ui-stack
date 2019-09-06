const doesAnyElement = (
  document: Document,
  predicate: (el: HTMLElement) => boolean
): boolean => {
  return ([...(document.querySelectorAll('*') as any)] as HTMLElement[]).some(
    predicate
  )
}

export default doesAnyElement
