import type { SVGProps } from "react"

export default function TorreonSiemprePuedeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Castle/Tower Icon */}
      <path
        d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50C85 30.67 69.33 15 50 15Z"
        fill="#FFFFFF"
      />
      <path d="M35 25H65V75H35V25Z" fill="#D02030" />
      <path d="M40 30H45V35H40V30Z" fill="#FFFFFF" />
      <path d="M55 30H60V35H55V30Z" fill="#FFFFFF" />
      <path d="M40 65H45V75H40V65Z" fill="#FFFFFF" />
      <path d="M55 65H60V75H55V65Z" fill="#FFFFFF" />
      <path d="M47.5 65H52.5V75H47.5V65Z" fill="#FFFFFF" />
      <path d="M35 40H65V45H35V40Z" fill="#FFFFFF" />

      {/* Text elements would be here in a real logo */}
      {/* For simplicity, we're using the tower icon only */}
    </svg>
  )
}
