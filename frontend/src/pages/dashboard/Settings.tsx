import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSettings } from '@/contexts/SettingsContext';
import { Sun, Moon, Monitor, Smartphone, Type } from 'lucide-react';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Customize your Terra Watchers experience
        </p>
      </div>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              {settings.theme === 'light' ? (
                <Sun className="h-6 w-6 text-primary" />
              ) : (
                <Moon className="h-6 w-6 text-primary" />
              )}
              <div>
                <Label className="text-base font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground">
                  {settings.theme === 'light' ? 'Day time mine (Light)' : 'Night time mine (Dark)'}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.theme === 'dark'}
              onCheckedChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
            />
          </div>

          {/* Layout Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">UI Layout</Label>
            <RadioGroup
              value={settings.layout}
              onValueChange={(value: 'desktop' | 'mobile') => updateSettings({ layout: value })}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="desktop" id="desktop" className="peer sr-only" />
                <Label
                  htmlFor="desktop"
                  className="flex flex-col items-center gap-3 p-4 rounded-lg border-2 border-muted cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <Monitor className="h-8 w-8" />
                  <span className="font-medium">Desktop</span>
                  <span className="text-xs text-muted-foreground">PC / Laptop view</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="mobile" id="mobile" className="peer sr-only" />
                <Label
                  htmlFor="mobile"
                  className="flex flex-col items-center gap-3 p-4 rounded-lg border-2 border-muted cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <Smartphone className="h-8 w-8" />
                  <span className="font-medium">Mobile</span>
                  <span className="text-xs text-muted-foreground">Phone / Tablet view</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Type className="h-5 w-5" />
              Font Size
            </Label>
            <RadioGroup
              value={settings.fontSize}
              onValueChange={(value: 'small' | 'normal' | 'large') => updateSettings({ fontSize: value })}
              className="grid grid-cols-3 gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="small" id="font-small" className="peer sr-only" />
                <Label
                  htmlFor="font-small"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-muted cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="text-sm font-medium">Aa</span>
                  <span className="text-xs">Small</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="normal" id="font-normal" className="peer sr-only" />
                <Label
                  htmlFor="font-normal"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-muted cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="text-base font-medium">Aa</span>
                  <span className="text-xs">Normal</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="large" id="font-large" className="peer sr-only" />
                <Label
                  htmlFor="font-large"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-muted cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="text-lg font-medium">Aa</span>
                  <span className="text-xs">Large</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Font Style */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Font Style</Label>
            <RadioGroup
              value={settings.fontStyle}
              onValueChange={(value: 'roboto' | 'roman' | 'comic' | 'opensans') => updateSettings({ fontStyle: value })}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="roboto" id="font-roboto" className="peer sr-only" />
                <Label
                  htmlFor="font-roboto"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-muted cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="font-roboto text-lg">Roboto</span>
                  <span className="text-xs text-muted-foreground">Modern</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="roman" id="font-roman" className="peer sr-only" />
                <Label
                  htmlFor="font-roman"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-muted cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="font-roman text-lg">Roman</span>
                  <span className="text-xs text-muted-foreground">Classic</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="comic" id="font-comic" className="peer sr-only" />
                <Label
                  htmlFor="font-comic"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-muted cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="font-comic text-lg">Comic</span>
                  <span className="text-xs text-muted-foreground">Playful</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="opensans" id="font-opensans" className="peer sr-only" />
                <Label
                  htmlFor="font-opensans"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-muted cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <span className="font-opensans text-lg">Open Sans</span>
                  <span className="text-xs text-muted-foreground">Clean</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your settings look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="text-xl font-bold">Sample Heading</h3>
            <p>This is how your text will appear with the current settings. The quick brown fox jumps over the lazy dog.</p>
            <p className="text-sm text-muted-foreground">Muted text example for secondary information.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
