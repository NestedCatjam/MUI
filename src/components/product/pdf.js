import React from 'react'

export default function Pdf({file}) {
  return (
    // <iframe src="/static/evidence/0701_07a1Organizational_12_2.pdf" frameborder="0"></iframe>
    <iframe src={file} frameBorder="0" width="90%" height="900px" zoom="1.50"></iframe>
  )
}
