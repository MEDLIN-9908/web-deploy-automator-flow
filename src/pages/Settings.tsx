
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const [jenkinsUrl, setJenkinsUrl] = useState("http://jenkins.example.com:8080");
  const [jenkinsToken, setJenkinsToken] = useState("••••••••••••••••");
  const [dockerHost, setDockerHost] = useState("tcp://docker-host:2376");
  const [dockerCert, setDockerCert] = useState("/path/to/cert.pem");
  
  const handleSave = (formName: string) => {
    toast.success(`${formName} settings saved successfully!`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your CI/CD platform</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="jenkins">Jenkins</TabsTrigger>
          <TabsTrigger value="docker">Docker</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage general platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="app-name">Application Name</Label>
                <Input id="app-name" defaultValue="DeployFlow" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Use dark theme</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto Refresh</p>
                  <p className="text-sm text-muted-foreground">Automatically refresh data every 30s</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Button onClick={() => handleSave("General")}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="jenkins" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Jenkins Configuration</CardTitle>
              <CardDescription>Configure Jenkins integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="jenkins-url">Jenkins URL</Label>
                  <Input 
                    id="jenkins-url" 
                    value={jenkinsUrl}
                    onChange={(e) => setJenkinsUrl(e.target.value)} 
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="jenkins-token">API Token</Label>
                  <Input 
                    id="jenkins-token" 
                    type="password" 
                    value={jenkinsToken}
                    onChange={(e) => setJenkinsToken(e.target.value)} 
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="jenkins-verify-ssl" defaultChecked />
                  <Label htmlFor="jenkins-verify-ssl">Verify SSL</Label>
                </div>
                
                <Button onClick={() => handleSave("Jenkins")}>Save Jenkins Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="docker" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Docker Configuration</CardTitle>
              <CardDescription>Configure Docker integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="docker-host">Docker Host</Label>
                  <Input 
                    id="docker-host" 
                    value={dockerHost}
                    onChange={(e) => setDockerHost(e.target.value)} 
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="docker-cert">Certificate Path</Label>
                  <Input 
                    id="docker-cert" 
                    value={dockerCert}
                    onChange={(e) => setDockerCert(e.target.value)} 
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="docker-tls" defaultChecked />
                  <Label htmlFor="docker-tls">Use TLS</Label>
                </div>
                
                <Button onClick={() => handleSave("Docker")}>Save Docker Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive pipeline status updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Slack Notifications</p>
                  <p className="text-sm text-muted-foreground">Send notifications to Slack channel</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Failed Jobs Only</p>
                  <p className="text-sm text-muted-foreground">Only notify on failed jobs</p>
                </div>
                <Switch />
              </div>
              
              <Button onClick={() => handleSave("Notifications")}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
