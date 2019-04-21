import * as React from 'react'

export function SpecialIcon(props: { icon: 'canada' | 'heart' }) {
  const { icon, ...remainingProps } = props
  if (icon === 'canada') {
    return (
      <svg
        viewBox="0 0 50 25"
        xmlns="http://www.w3.org/2000/svg"
        {...remainingProps}
      >
        <title>Canada, eh</title>
        <g fill-rule="nonzero" fill="none">
          <path fill="red" d="M0 0h50v25H0z" />
          <path fill="#FFF" d="M12.5 0h25v25h-25z" />
          <path
            d="M25 2.344l-1.706 3.181c-.194.346-.54.314-.887.12l-1.235-.639.92 4.886c.194.893-.427.893-.733.507l-2.156-2.412-.35 1.225c-.04.16-.217.33-.483.29l-2.725-.574.715 2.603c.154.579.273.819-.154.971l-.972.457 4.691 3.81c.186.144.28.404.214.638l-.41 1.348c1.614-.187 3.062-.467 4.678-.64.142-.014.381.221.38.386l-.214 4.936h.786l-.124-4.925c-.001-.165.216-.411.358-.396 1.616.172 3.064.452 4.679.639l-.41-1.348a.614.614 0 0 1 .213-.638l4.69-3.81-.97-.457c-.428-.152-.309-.392-.155-.971l.715-2.603-2.725.573c-.266.04-.443-.128-.483-.29l-.35-1.224-2.155 2.412c-.307.386-.928.386-.734-.506l.92-4.887-1.235.64c-.347.193-.693.225-.887-.121"
            fill="red"
          />
        </g>
      </svg>
    )
  } else {
    return (
      <svg
        viewBox="0 0 54 50"
        xmlns="http://www.w3.org/2000/svg"
        {...remainingProps}
      >
        <title>Heart</title>
        <path
          d="M24.873 47.201c-1.162-1.341-4.064-3.956-6.449-5.81-7.066-5.496-8.028-6.291-10.897-9.012C2.238 27.364-.008 22.325 0 15.493c.004-3.336.224-4.62 1.131-6.587 1.54-3.335 3.806-5.814 6.704-7.33C9.887.504 10.899.027 14.327.007c3.585-.02 4.34.41 6.449 1.604 2.567 1.452 5.21 4.556 5.756 6.76l.337 1.363.832-1.876c4.7-10.598 19.71-10.44 24.933.264 1.657 3.395 1.839 10.645.37 14.729-1.917 5.327-5.517 9.389-13.839 15.612-5.457 4.082-11.634 10.258-12.064 11.125-.499 1.007-.024.158-2.228-2.386z"
          fill="red"
          fill-rule="nonzero"
        />
      </svg>
    )
  }
}
