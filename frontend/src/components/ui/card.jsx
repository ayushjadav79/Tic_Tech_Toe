export const Card = ({ children, className }) => (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>
  )
  
  export const CardHeader = ({ children, className }) => (
    <div className={`mb-2 ${className}`}>{children}</div>
  )
  
  export const CardTitle = ({ children, className }) => (
    <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
  )
  
  export const CardDescription = ({ children, className }) => (
    <p className={`text-gray-500 ${className}`}>{children}</p>
  )
  
  export const CardContent = ({ children, className }) => (
    <div className={`my-2 ${className}`}>{children}</div>
  )
  
  export const CardFooter = ({ children, className }) => (
    <div className={`pt-2 mt-2 border-t ${className}`}>{children}</div>
  )
  