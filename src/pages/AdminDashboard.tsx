
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { 
  UsersRound, 
  UserRound, 
  CalendarClock, 
  DollarSign, 
  Search, 
  ChevronDown, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock,
  BarChart3,
  BadgePercent,
  ArrowUpCircle,
  ArrowDownCircle,
  Filter
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('week');
  
  // Mock data for overview stats
  const overviewStats = {
    totalCoaches: 128,
    totalClients: 1456,
    totalSessions: 3790,
    totalRevenue: 284500,
    weeklyChange: {
      coaches: 8,
      clients: 47,
      sessions: 215,
      revenue: 12350
    },
    monthlyChange: {
      coaches: 22,
      clients: 173,
      sessions: 842,
      revenue: 47500
    }
  };
  
  // Mock data for coach applications
  const coachApplications = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      email: 'jennifer.m@example.com',
      specialty: 'Executive Leadership',
      experience: '12 years',
      appliedDate: '2023-11-02',
      status: 'pending',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    },
    {
      id: 2,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      specialty: 'Career Development',
      experience: '8 years',
      appliedDate: '2023-10-30',
      status: 'pending',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    },
    {
      id: 3,
      name: 'Michael Thompson',
      email: 'michael.t@example.com',
      specialty: 'Sports Performance',
      experience: '10 years',
      appliedDate: '2023-10-28',
      status: 'approved',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      specialty: 'Mental Wellness',
      experience: '15 years',
      appliedDate: '2023-10-25',
      status: 'approved',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80'
    },
    {
      id: 5,
      name: 'Robert Chen',
      email: 'robert.c@example.com',
      specialty: 'Nutrition & Wellness',
      experience: '7 years',
      appliedDate: '2023-10-22',
      status: 'rejected',
      photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    }
  ];
  
  // Mock data for recent transactions
  const recentTransactions = [
    {
      id: 1,
      client: 'Alex Rodriguez',
      coach: 'Dr. Sarah Johnson',
      amount: 150,
      date: '2023-11-03',
      packageName: 'Single Session',
      status: 'completed'
    },
    {
      id: 2,
      client: 'Emma Davis',
      coach: 'Mark Williams',
      amount: 520,
      date: '2023-11-02',
      packageName: 'Monthly Package',
      status: 'completed'
    },
    {
      id: 3,
      client: 'James Wilson',
      coach: 'Emily Chen',
      amount: 1450,
      date: '2023-11-01',
      packageName: 'Quarterly Intensive',
      status: 'completed'
    },
    {
      id: 4,
      client: 'Sophia Lee',
      coach: 'Dr. Sarah Johnson',
      amount: 150,
      date: '2023-10-31',
      packageName: 'Single Session',
      status: 'refunded'
    },
    {
      id: 5,
      client: 'Michael Brown',
      coach: 'Mark Williams',
      amount: 520,
      date: '2023-10-29',
      packageName: 'Monthly Package',
      status: 'completed'
    }
  ];
  
  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      client: 'Alex Rodriguez',
      coach: 'Dr. Sarah Johnson',
      type: 'Leadership Development',
      date: '2023-11-04',
      time: '3:00 PM',
      status: 'scheduled'
    },
    {
      id: 2,
      client: 'Emma Davis',
      coach: 'Mark Williams',
      type: 'Career Coaching',
      date: '2023-11-04',
      time: '4:30 PM',
      status: 'scheduled'
    },
    {
      id: 3,
      client: 'James Wilson',
      coach: 'Emily Chen',
      type: 'Wellness Coaching',
      date: '2023-11-05',
      time: '10:00 AM',
      status: 'scheduled'
    },
    {
      id: 4,
      client: 'Sophia Lee',
      coach: 'Dr. Sarah Johnson',
      type: 'Leadership Development',
      date: '2023-11-05',
      time: '2:00 PM',
      status: 'scheduled'
    }
  ];
  
  // Status badge component for reusability
  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, { variant: "default" | "outline" | "secondary" | "destructive", label: string }> = {
      pending: { variant: "outline", label: "Pending Review" },
      approved: { variant: "default", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
      completed: { variant: "default", label: "Completed" },
      refunded: { variant: "destructive", label: "Refunded" },
      scheduled: { variant: "secondary", label: "Scheduled" }
    };
    
    const { variant, label } = variants[status] || { variant: "outline", label: status };
    
    return <Badge variant={variant}>{label}</Badge>;
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Platform Administration</h1>
            <p className="text-muted-foreground">Monitor and manage your coaching platform</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
            <Button>
              <BadgePercent className="mr-2 h-4 w-4" />
              Manage Plans
            </Button>
          </div>
        </div>
        
        {/* Overview Statistics */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Platform Overview</h2>
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                className={`rounded-none ${activeView === 'week' ? 'bg-muted' : ''}`}
                onClick={() => setActiveView('week')}
              >
                Weekly
              </Button>
              <Button 
                variant="ghost" 
                className={`rounded-none ${activeView === 'month' ? 'bg-muted' : ''}`}
                onClick={() => setActiveView('month')}
              >
                Monthly
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground mb-1">Total Coaches</p>
                    <p className="text-3xl font-bold">{overviewStats.totalCoaches}</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <UsersRound className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  {activeView === 'week' ? (
                    <>
                      <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">+{overviewStats.weeklyChange.coaches}</span>
                      <span className="text-muted-foreground text-sm ml-1">this week</span>
                    </>
                  ) : (
                    <>
                      <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">+{overviewStats.monthlyChange.coaches}</span>
                      <span className="text-muted-foreground text-sm ml-1">this month</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground mb-1">Total Clients</p>
                    <p className="text-3xl font-bold">{overviewStats.totalClients}</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <UserRound className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  {activeView === 'week' ? (
                    <>
                      <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">+{overviewStats.weeklyChange.clients}</span>
                      <span className="text-muted-foreground text-sm ml-1">this week</span>
                    </>
                  ) : (
                    <>
                      <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">+{overviewStats.monthlyChange.clients}</span>
                      <span className="text-muted-foreground text-sm ml-1">this month</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground mb-1">Total Sessions</p>
                    <p className="text-3xl font-bold">{overviewStats.totalSessions}</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-full">
                    <CalendarClock className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  {activeView === 'week' ? (
                    <>
                      <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">+{overviewStats.weeklyChange.sessions}</span>
                      <span className="text-muted-foreground text-sm ml-1">this week</span>
                    </>
                  ) : (
                    <>
                      <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">+{overviewStats.monthlyChange.sessions}</span>
                      <span className="text-muted-foreground text-sm ml-1">this month</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold">${(overviewStats.totalRevenue).toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-amber-500/10 rounded-full">
                    <DollarSign className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  {activeView === 'week' ? (
                    <>
                      <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">+${overviewStats.weeklyChange.revenue.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm ml-1">this week</span>
                    </>
                  ) : (
                    <>
                      <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">+${overviewStats.monthlyChange.revenue.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm ml-1">this month</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="w-full grid grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="applications">
              <Badge className="mr-2">{coachApplications.filter(app => app.status === 'pending').length}</Badge>
              Coach Applications
            </TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Coach Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Coach Applications</CardTitle>
                    <CardDescription>Review and manage coach applications</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search applications..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coachApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img 
                              src={application.photo} 
                              alt={application.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{application.name}</p>
                              <p className="text-xs text-muted-foreground">{application.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{application.specialty}</TableCell>
                        <TableCell>{application.experience}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>
                          <StatusBadge status={application.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            {application.status === 'pending' && (
                              <>
                                <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Monitor all financial transactions on the platform</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search transactions..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Coach</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>#{transaction.id.toString().padStart(5, '0')}</TableCell>
                        <TableCell>{transaction.client}</TableCell>
                        <TableCell>{transaction.coach}</TableCell>
                        <TableCell>{transaction.packageName}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>${transaction.amount}</TableCell>
                        <TableCell>
                          <StatusBadge status={transaction.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Showing 5 of 230 transactions</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>By package type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Single Sessions</span>
                        <span className="text-sm font-medium">$95,250</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">35% of total revenue</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Monthly Packages</span>
                        <span className="text-sm font-medium">$120,900</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">45% of total revenue</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Quarterly Packages</span>
                        <span className="text-sm font-medium">$53,350</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">20% of total revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Coaches</CardTitle>
                  <CardDescription>By revenue generated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80"
                            alt="Dr. Sarah Johnson"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">1</div>
                        </div>
                        <div>
                          <p className="font-medium">Dr. Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">Leadership Coach</p>
                        </div>
                      </div>
                      <p className="font-semibold">$42,850</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                            alt="Mark Williams"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="absolute -top-1 -right-1 bg-slate-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">2</div>
                        </div>
                        <div>
                          <p className="font-medium">Mark Williams</p>
                          <p className="text-xs text-muted-foreground">Career Coach</p>
                        </div>
                      </div>
                      <p className="font-semibold">$38,420</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80"
                            alt="Emily Chen"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">3</div>
                        </div>
                        <div>
                          <p className="font-medium">Emily Chen</p>
                          <p className="text-xs text-muted-foreground">Wellness Coach</p>
                        </div>
                      </div>
                      <p className="font-semibold">$31,750</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Summary</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Total Processed</h4>
                        <p className="font-semibold text-xl">$47,500</p>
                      </div>
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUpCircle className="h-4 w-4 mr-1" />
                        <span>12.5% increase from last month</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Completed</span>
                        <span className="font-medium">$45,800</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Refunded</span>
                        <span className="font-medium text-red-500">$1,700</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform Fees</span>
                        <span className="font-medium">$9,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coach Payouts</span>
                        <span className="font-medium">$38,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>Overview of coaching sessions across the platform</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="default">
                      Today's Sessions
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Coach</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.client}</TableCell>
                        <TableCell>{session.coach}</TableCell>
                        <TableCell>{session.type}</TableCell>
                        <TableCell>{session.date}</TableCell>
                        <TableCell>{session.time}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-amber-500" />
                            <span>Scheduled</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                      Sessions Overview
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Today</p>
                        <p className="text-xl font-bold">24</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">This Week</p>
                        <p className="text-xl font-bold">163</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-xl font-bold">3,428</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Canceled</p>
                        <p className="text-xl font-bold">362</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Session Types</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Leadership Development</span>
                          <span>42%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Career Coaching</span>
                          <span>28%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Wellness</span>
                          <span>18%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Others</span>
                          <span>12%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Session Health</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Completion Rate</span>
                        </div>
                        <span className="font-medium">94.5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                          <span className="text-sm">Average Duration</span>
                        </div>
                        <span className="font-medium">56 min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Client Satisfaction</span>
                        </div>
                        <span className="font-medium">4.8/5.0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">No-show Rate</span>
                        </div>
                        <span className="font-medium">2.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Platform Analytics</CardTitle>
                    <CardDescription>Comprehensive analytics and insights</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Last 30 Days
                    </Button>
                    <Button variant="outline">
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-card overflow-hidden mb-8">
                  <div className="p-6">
                    <h3 className="font-semibold mb-6">Revenue & Sessions Overview</h3>
                    <div className="h-64 w-full bg-muted/30 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Chart visualization would appear here</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                      <CardDescription>New coaches and clients over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 w-full bg-muted/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Growth chart would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Engagement</CardTitle>
                      <CardDescription>Sessions and interactions statistics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 w-full bg-muted/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Engagement chart would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Coach Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Coaches</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-2xl font-bold">112</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              +8%
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Average Rating</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-2xl font-bold">4.8/5.0</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              +0.2
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Average Sessions/Coach</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-2xl font-bold">34</p>
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              +2%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Client Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Clients</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-2xl font-bold">1,348</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              +12%
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Retention Rate</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-2xl font-bold">78%</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              +5%
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Avg. Sessions/Client</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-2xl font-bold">2.8</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              +0.3
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Business Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-2xl font-bold">$47,500</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              +15%
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Customer Acquisition Cost</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-2xl font-bold">$42</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">
                              <ArrowDownCircle className="h-3 w-3 mr-1" />
                              -8%
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Lifetime Value</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-2xl font-bold">$840</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              +12%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
