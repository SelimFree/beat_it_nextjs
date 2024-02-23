import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div>
        <h2>404 Not Found</h2>
        <p>Oops! It seems the page is not found</p>
        <Link href="/">Go home</Link>
    </div>
  )
}

export default NotFound