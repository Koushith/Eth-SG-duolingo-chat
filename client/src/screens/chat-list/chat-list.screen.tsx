import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import axios from "axios"
import { BACKEND_URL } from "@/utils/constants"
import { useUser } from "@/context/user.context"

// Remove this line as it's likely unnecessary
// import "@/components/ui/button.css"

interface Preference {
  name: string;
  count: number;
}

interface User {
  _id: string;
  userName: string;
  email: string;
}

export function ChatListScreen() {
  const [users, setUsers] = useState<User[]>([])
  const [preferences, setPreferences] = useState<Preference[]>([])
  const navigate = useNavigate()
  const { user } = useUser()

  useEffect(() => {
    if (user && user.preferences) {
      const formattedPreferences = Object.entries(user.preferences)
        .filter(([_, pref]) => typeof pref === 'object' && pref !== null)
        .map(([_, pref]) => ({
          name: (pref as { name: string }).name,
          count: (pref as { count: number }).count
        }));
      setPreferences(formattedPreferences);
    }
  }, [user]);

  const getUsersBasedOnPreferences = async () => {
    try {
      if (user && preferences.length > 0) {
        console.log("Sending preferences:", preferences);
        console.log("Sending email:", user.email);

        const { data } = await axios.post(`${BACKEND_URL}/api/user/get-users`, {
          preferences: preferences,
          email: user.email,
        });

        console.log("Fetched users:", data.users);
        setUsers(data.users);
      } else {
        console.error('No logged in user found or preferences are missing');
      }
    } catch (error) {
      console.error('Error fetching users based on preferences:', error);
    }
  }

  useEffect(() => {
    if (user && preferences.length > 0) {
      getUsersBasedOnPreferences();
    }
  }, [user, preferences]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-3xl font-bold">Chats</h2>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => { /* Handle new chat creation */ }}
                >
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">New chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center space-x-4 cursor-pointer hover:bg-accent p-4 rounded-lg transition-colors duration-200"
                onClick={() => navigate(`/chat/${user._id}`)}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.userName}`} alt={user.userName} />
                  <AvatarFallback>{user.userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-medium leading-none">{user.userName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}