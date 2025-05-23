import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Users, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}
        </p>
      </header>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center">
            <Activity className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Users"
              description="Total registered users"
              value="1,234"
              icon={<Users className="h-5 w-5 text-muted-foreground" />}
            />
            <DashboardCard
              title="Active Sessions"
              description="Current active user sessions"
              value="567"
              icon={<Activity className="h-5 w-5 text-muted-foreground" />}
            />
            <DashboardCard
              title="New Registrations"
              description="Users registered today"
              value="12"
              icon={<Users className="h-5 w-5 text-muted-foreground" />}
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent authentication events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        i === 1 ? "bg-green-500" : "bg-blue-500"
                      )} />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          {i === 1 ? "Login successful" : `Activity ${i}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date().toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
                <CardDescription>Your account security information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Password Strength</span>
                    <span className="text-sm font-medium text-green-500">Strong</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Password Change</span>
                    <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Sessions</span>
                    <span className="text-sm font-medium">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>User analytics and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Analytics content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generated reports and data</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reports content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your dashboard preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Settings content would go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
}

function DashboardCard({ title, description, value, icon }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}