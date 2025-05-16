import { useLocale } from "next-intl";
import { twMerge } from "tailwind-merge"

const variants = {
  primary: 'bg-primary text-white',
  default: 'bg-secondary text-white',
  danger: 'bg-red-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-300 text-white',
  neutral: 'bg-gray-300 text-black',
}

const sizes = {
  sm: 'text-sm px-2 py-1',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  keepLocale?: boolean;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  as?: React.ElementType;
  href?: string;
}

const baseStyle = "rounded-md font-light transition text-center";

export const Button = ({ variant = "default", size = "md", className, as, keepLocale = true, ...props }: ButtonProps) => {
  const Component = as || "button";
  const locale = useLocale();
  const extraProps: ButtonProps = {
    className: twMerge(variants[variant], sizes[size], baseStyle, className),
  }

  if (props.href)
    extraProps.href = keepLocale ? `/${locale}${props.href}` : props.href;

  return <Component {...props} {...extraProps} />
}