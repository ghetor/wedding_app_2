export default function Slider({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} type="range" className={`slider-ghet ${className || ""}`} />;
}
