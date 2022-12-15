import Link from "next/link";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  expand?: boolean;
}

function Button({ children }: IButton) {
  return children;
}

Button.GradientOutline = function ButtonGradientOutline({
  text,
  href,
  iconLeft,
  iconRight,
  expand,
  ...props
}: IButton) {
  return (
    <span
      className={`flex  ${
        expand ? "flex-1 w-full" : "w-max" // had grow here
      } justify-center items-center rounded-full btn-gradient-outline py-[1px] px-[1px] text-sm font-medium`}
    >
      <button
        className={`w-full shadow-md shadow-indigo-400/30 hover:shadow-lg hover:shadow-indigo-500/50 bg-primary-900 hover:bg-primary-900/80  block py-1 px-3 rounded-full transition-all cursor-pointer disabled:cursor-not-allowed ${
          (iconLeft || iconRight) && "flex gap-2 items-center justify-center"
        }  transition-all`}
        {...props}
      >
        {iconLeft}
        {href ? (
          <Link href={href} className="leading-2 m-0 p-0">
            {text}
          </Link>
        ) : (
          <span className="leading-2 m-0 p-0">{text}</span>
        )}
        {iconRight}
      </button>
    </span>
  );
};

Button.Outline = function ButtonOutline({
  text,
  href,
  expand,
  iconLeft,
  iconRight,
  ...props
}: IButton) {
  return (
    <span
      className={`flex ${
        expand ? "grow w-full" : "w-max"
      }  rounded-full py-[1px] px-[1px] text-sm font-medium`}
    >
      <button
        className={`border-[0.25px] disabled:cursor-not-allowed ${
          expand ? "w-full" : "w-max"
        } border-white/10 hover:border-indigo-400/50 py-1 px-3 rounded-full cursor-pointer  ${
          (iconLeft || iconRight) && "flex gap-2 items-center justify-center"
        } transition-all`}
        {...props}
      >
        {href ? (
          <Link href={href} className="leading-2 m-0 p-0">
            {text}
          </Link>
        ) : (
          <span className="leading-2 m-0 p-0">{text}</span>
        )}
        {iconLeft}
        {iconRight}
      </button>
    </span>
  );
};

Button.FullGradient = function ButtonGradientFull({
  text,
  href,
  iconLeft,
  iconRight,
  expand,
}: IButton) {
  return (
    <button
      className={`${
        expand ? "w-full" : "w-max"
      } btn-gradient-full border-[0.5px] border-white/20 hover:border-indigo-400 text-sm py-1 px-3 rounded-full cursor-pointer  ${
        (iconLeft || iconRight) && "flex gap-2 items-center"
      } transition-all`}
    >
      {iconLeft}
      {href ? (
        <Link href={href} className="leading-2 m-0 p-0">
          {text}
        </Link>
      ) : (
        <span className="leading-2 m-0 p-0">{text}</span>
      )}
      {iconRight}
    </button>
  );
};

export default Button;
