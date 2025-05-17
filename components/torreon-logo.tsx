import type { SVGProps } from "react"

export default function TorreonLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="50" fill="white" />
      <path
        d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50C85 30.67 69.33 15 50 15Z"
        fill="#0A3B32"
      />
      <path
        d="M50 20C33.43 20 20 33.43 20 50C20 66.57 33.43 80 50 80C66.57 80 80 66.57 80 50C80 33.43 66.57 20 50 20Z"
        fill="#24B649"
      />
      <path
        d="M50 25C36.19 25 25 36.19 25 50C25 63.81 36.19 75 50 75C63.81 75 75 63.81 75 50C75 36.19 63.81 25 50 25Z"
        fill="#0A3B32"
      />
      <path d="M35 35H65V65H35V35Z" fill="#24B649" />
      <path d="M40 40H60V60H40V40Z" fill="#0A3B32" />
      <path d="M45 30V70" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 30V70" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 45H70" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 55H70" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="50" r="5" fill="white" />
    </svg>
  )
}
