"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Briefcase, Clock, DollarSign, MessageSquare, Star, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DELIVERED';
  price: number;
  requirements?: string;
  deliveryUrl?: string;
  createdAt: string;
  completedAt?: string;
  service: {
    id: string;
    title: string;
    description: string;
    deliveryTime: number;
    user: {
      id: string;
      name: string;
      avatar?: string;
    };
    category: {
      id: string;
      name: string;
      icon?: string;
    };
  };
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  organization?: {
    id: string;
    name: string;
    logo?: string;
  };
  reviews?: Array<{
    id: string;
    rating: number;
    comment?: string;
  }>;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, filterStatus]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: filterStatus,
      });

      const response = await fetch(`/api/orders?${params}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string, deliveryUrl?: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, deliveryUrl }),
      });

      if (response.ok) {
        toast({
          title: "Order updated!",
          description: `Order status has been updated to ${status}.`,
        });
        fetchOrders();
        setIsOrderDetailsOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to update order status.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <AlertCircle className="h-4 w-4" />;
      case 'IN_PROGRESS':
        return <Clock className="h-4 w-4" />;
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4" />;
      case 'DELIVERED':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'secondary';
      case 'IN_PROGRESS':
        return 'default';
      case 'COMPLETED':
        return 'default';
      case 'CANCELLED':
        return 'destructive';
      case 'DELIVERED':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const canUpdateStatus = (order: Order, newStatus: string) => {
    if (user?.role === 'USER') {
      // Freelancer can update from PENDING to IN_PROGRESS, IN_PROGRESS to DELIVERED
      return (
        (order.status === 'PENDING' && newStatus === 'IN_PROGRESS') ||
        (order.status === 'IN_PROGRESS' && newStatus === 'DELIVERED')
      );
    } else if (user?.role === 'ORGANIZATION') {
      // Organization can update from DELIVERED to COMPLETED, or cancel PENDING orders
      return (
        (order.status === 'DELIVERED' && newStatus === 'COMPLETED') ||
        (order.status === 'PENDING' && newStatus === 'CANCELLED')
      );
    }
    return false;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-muted-foreground">
            {user?.role === 'USER' ? 'Manage your client orders' : 'Track your project orders'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Orders</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {filterStatus === 'ALL' 
                  ? "You don't have any orders yet."
                  : `You don't have any ${filterStatus.toLowerCase()} orders.`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge variant={getStatusColor(order.status)} className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span>{order.status.replace('_', ' ')}</span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{order.service.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {order.service.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">${order.price}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{order.service.deliveryTime} days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="outline">{order.service.category.name}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {user?.role === 'USER' ? (
                          <>
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={order.organization?.logo} />
                              <AvatarFallback>
                                {order.organization?.name?.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{order.organization?.name}</span>
                          </>
                        ) : (
                          <>
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={order.user.avatar} />
                              <AvatarFallback>
                                {order.user.name?.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{order.user.name}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {order.requirements && (
                      <div className="mb-4">
                        <Label className="text-sm font-medium text-muted-foreground">Requirements:</Label>
                        <p className="text-sm mt-1">{order.requirements}</p>
                      </div>
                    )}

                    {order.reviews && order.reviews.length > 0 && (
                      <div className="mb-4">
                        <Label className="text-sm font-medium text-muted-foreground">Review:</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(order.reviews[0].rating)}
                          <span className="text-sm">{order.reviews[0].comment}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Dialog open={isOrderDetailsOpen && selectedOrder?.id === order.id} onOpenChange={(open) => {
                      setIsOrderDetailsOpen(open);
                      if (!open) setSelectedOrder(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order Details</DialogTitle>
                          <DialogDescription>
                            Order #{order.id} - {order.service.title}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                              <Badge variant={getStatusColor(order.status)} className="mt-1">
                                {order.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Price</Label>
                              <p className="font-medium">${order.price}</p>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Service</Label>
                            <p className="font-medium">{order.service.title}</p>
                            <p className="text-sm text-muted-foreground">{order.service.description}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              {user?.role === 'USER' ? 'Client' : 'Freelancer'}
                            </Label>
                            <div className="flex items-center space-x-2 mt-1">
                              <Avatar>
                                <AvatarImage src={user?.role === 'USER' ? order.organization?.logo : order.user.avatar} />
                                <AvatarFallback>
                                  {(user?.role === 'USER' ? order.organization?.name : order.user.name)?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span>{user?.role === 'USER' ? order.organization?.name : order.user.name}</span>
                            </div>
                          </div>
                          
                          {order.requirements && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Requirements</Label>
                              <p className="text-sm mt-1">{order.requirements}</p>
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            {canUpdateStatus(order, 'IN_PROGRESS') && (
                              <Button onClick={() => updateOrderStatus(order.id, 'IN_PROGRESS')}>
                                Start Working
                              </Button>
                            )}
                            {canUpdateStatus(order, 'DELIVERED') && (
                              <Button onClick={() => updateOrderStatus(order.id, 'DELIVERED')}>
                                Mark as Delivered
                              </Button>
                            )}
                            {canUpdateStatus(order, 'COMPLETED') && (
                              <Button onClick={() => updateOrderStatus(order.id, 'COMPLETED')}>
                                Complete Order
                              </Button>
                            )}
                            {canUpdateStatus(order, 'CANCELLED') && (
                              <Button variant="destructive" onClick={() => updateOrderStatus(order.id, 'CANCELLED')}>
                                Cancel Order
                              </Button>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}