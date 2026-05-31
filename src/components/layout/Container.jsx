export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
