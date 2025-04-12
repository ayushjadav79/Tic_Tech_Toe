// D:/Coding/React programs/Hacktastic/frontend/src/components/ui/input.jsx

const Input = ({ type = "text", value, onChange, placeholder, className = "" }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
  
  export { Input }; // ✅ Named export
  