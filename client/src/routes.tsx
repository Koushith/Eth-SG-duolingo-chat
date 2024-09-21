import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts";
import { AuthScreen, ChatScreen, ChatListScreen, OnboardingScreen, PreferenceScreen, SettingsScreen, ProfileScreen } from "./screens";


export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <AuthScreen />,
        errorElement: <div>Error loading auth screen</div>,
      },
      {
        path: "/chat/:userId",
        element: <ChatScreen />,
        errorElement: <div>Error loading chat screen</div>,
      },
      {
        path: "/chat-list",
        element: <ChatListScreen />,
        errorElement: <div>Error loading chat list screen</div>,
      },
      {
        path: "/onboarding",
        element: <OnboardingScreen />,
        errorElement: <div>Error loading onboarding screen</div>,
      },
      {
        path: "/preference",
        element: <PreferenceScreen />,
        errorElement: <div>Error loading preference screen</div>,
      },
      {
        path: "/settings",
        element: <SettingsScreen />,
        errorElement: <div>Error loading settings screen</div>,
      },
      {
        path: "/profile",
        element: <ProfileScreen />,
        errorElement: <div>Error loading profile screen</div>,
      }
    ],
  },
]);
