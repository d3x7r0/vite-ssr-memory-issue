import React from 'react'

export { Page }

function Page(props) {
  return (
    <pre>{ JSON.stringify(props, null, 2) }</pre>
  )
}
