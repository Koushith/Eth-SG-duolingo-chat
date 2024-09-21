import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { BACKEND_URL } from '@/utils/constants';
import { useUser } from '@/context/user.context';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Preference {
  name: string;
  count: number;
}

export const PreferenceScreen = () => {
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { user , setUser} = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const getAchievementNames = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/achievement-names`);
      if (response.data.success && Array.isArray(response.data.data)) {
        const formattedPreferences = response.data.data.map((name: string) => ({
          name,
          count: 0
        }));
        setPreferences(formattedPreferences);
      } else {
        setPreferences([]);
      }
    } catch (error) {
      console.error('Error fetching achievement names:', error);
      setPreferences([]);
    }
  };

  const handleScoreChange = (name: string, value: string) => {
    setPreferences(prevPrefs => 
      prevPrefs.map(pref => 
        pref.name === name ? { ...pref, count: parseInt(value) } : pref
      )
    );
  };

  const savePreferences = async () => {
    setIsSaving(true);
    try {
      console.log("preferences----", preferences);
      const { data } = await axios.post(`${BACKEND_URL}/api/user/update`, { 
        preferences: preferences, 
        email: user?.email   //TODO: change this to the user's email
      });
      console.log("data", data);
      if (data.success) {
        toast({
          title: "Success",
          description: "Preferences saved successfully!",
        });

        console.log("what is inside data", data);
        localStorage.setItem("userPreferences", JSON.stringify(data.user));
        setUser(data.user);
        navigate('/chat-list');
      } else {
        toast({
          title: "Error",
          description: "Failed to save preferences. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    getAchievementNames();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>🏆 Achievement Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          {preferences.length > 0 ? (
            <div className="space-y-4">
              {preferences.map(pref => (
                <div key={pref.name} className="flex items-center justify-between">
                  <Label className="capitalize flex items-center">
                    {pref.name}
                  </Label>
                  <select
                    value={pref.count}
                    onChange={(e) => handleScoreChange(pref.name, e.target.value)}
                    className="w-32 p-2 border rounded"
                  >
                    <option value="0">Any 🌟</option>
                    <option value="5">&gt; 5 🥉</option>
                    <option value="10">&gt; 10 🥉</option>
                    <option value="15">&gt; 15 🥈</option>
                    <option value="20">&gt; 20 🥇</option>
                    <option value="25">&gt; 25 💎</option>
                    <option value="30">&gt; 30 👑</option>
                  </select>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading preferences...</p>
          )}
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Label>🌍 Language</Label>
              <span className="px-2 py-1 text-sm font-semibold bg-gray-200 rounded-full">
                🇺🇸 English
              </span>
            </div>
            <Input
              type="text"
              value="English"
              disabled
              className="w-40 bg-gray-100"
            />
            <Button onClick={savePreferences} disabled={isSaving}>
              {isSaving ? 'Saving...' : '💾 Save Preferences'}
            </Button>

            <Button onClick={() => navigate('/chat')}>skip</Button>
          </div>
        </CardContent>
      </Card>
    </div>    
  );
};