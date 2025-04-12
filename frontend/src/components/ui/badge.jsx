export const Badge = ({ children, variant = "default", className = "" }) => {
    const styles =
      variant === "outline"
        ? "border border-gray-400 text-gray-700"
        : "bg-blue-100 text-blue-800"
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles} ${className}`}>
        {children}
      </span>
    )
  }
  