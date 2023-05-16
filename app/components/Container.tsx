import React from 'react'
import { ReactNode } from 'react';
type ContainerProps = {
    children: React.ReactNode;
}

export default function Container({children}: ContainerProps) {
  return (
    <div>{children}</div>
  )
}
