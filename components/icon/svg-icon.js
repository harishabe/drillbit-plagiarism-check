import React from 'react'

import Image from 'next/image'

const SvgIcon = props => {
  const { iconPath } = props
  return (
  // <SvgContainer {...props}>
  //     <Icon />
  // </SvgContainer>
    <Image src={iconPath} width="100%" height="100%" />
  )
}

export default SvgIcon