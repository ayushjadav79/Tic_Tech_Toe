// src/lib/utils.js

/**
 * Combines multiple class names into one string.
 * Filters out falsy values (like false, null, undefined).
 * 
 * Example:
 * cn("btn", isActive && "btn-active") => "btn btn-active"
 */
export function cn(...inputs) {
    return inputs.filter(Boolean).join(" ");
  }
  