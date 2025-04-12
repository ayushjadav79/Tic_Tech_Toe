import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
      <SignedIn>
          <App />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { ClerkProvider } from '@clerk/clerk-react';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';

// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!clerkPubKey) {
//   throw new Error('Add your Clerk Publishable Key to the .env file');
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ClerkProvider publishableKey={clerkPubKey}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </ClerkProvider>
//   </React.StrictMode>
// );
