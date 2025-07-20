import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getAuthUser } from "@/lib/auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { TicketWithDetails } from "@/lib/types";
import { QrCode, Calendar, MapPin, Clock } from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const user = getAuthUser();
  const [selectedTicket, setSelectedTicket] = useState<TicketWithDetails | null>(null);
  const [showTicketDialog, setShowTicketDialog] = useState(false);

  const { data: tickets, isLoading } = useQuery<TicketWithDetails[]>({
    queryKey: ["/api/tickets"],
  });

  const updateTicketMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      const response = await apiRequest("PUT", `/api/tickets/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin vé đã được cập nhật",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Cập nhật thất bại",
        description: error.message || "Không thể cập nhật vé",
        variant: "destructive",
      });
    },
  });

  const handleCancelTicket = (ticketId: number) => {
    updateTicketMutation.mutate({
      id: ticketId,
      updates: { status: "cancelled" }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-600">Đã thanh toán</Badge>;
      case "pending":
        return <Badge className="bg-yellow-600">Chờ thanh toán</Badge>;
      case "cancelled":
        return <Badge className="bg-red-600">Đã hủy</Badge>;
      default:
        return <Badge className="bg-gray-600">{status}</Badge>;
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(parseInt(price));
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-orange-100 border-orange-200">
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-orange-200" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full bg-orange-200" />
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="lg:col-span-2">
              <Card className="bg-orange-100 border-orange-200">
                <CardHeader>
                  <Skeleton className="h-6 w-32 bg-orange-200" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-32 w-full bg-orange-200" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="bg-orange-100 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-900 text-2xl">Tài khoản của tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Profile */}
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-900">Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-orange-700">Họ tên</Label>
                    <Input
                      value={user?.fullName || ""}
                      className="bg-orange-100 border-orange-200 text-orange-900"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-orange-700">Email</Label>
                    <Input
                      value={user?.email || ""}
                      className="bg-orange-100 border-orange-200 text-orange-900"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-orange-700">Tên đăng nhập</Label>
                    <Input
                      value={user?.username || ""}
                      className="bg-orange-100 border-orange-200 text-orange-900"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-orange-700">Vai trò</Label>
                    <Badge className="bg-orange-400 text-orange-900 mt-2">
                      {user?.role === "admin" ? "Quản trị viên" : 
                       user?.role === "staff" ? "Nhân viên" : "Khách hàng"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket History */}
              <div className="lg:col-span-2">
                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-900">Lịch sử đặt vé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {tickets && tickets.length > 0 ? (
                      <div className="space-y-4">
                        {tickets.map((ticket) => (
                          <Card key={ticket.id} className="bg-orange-100 border-orange-200">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-orange-900">
                                  {ticket.movie?.title || "Tên phim"}
                                </h4>
                                {getStatusBadge(ticket.status)}
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-700">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>
                                      {ticket.showtime?.room?.cinema?.name || "Rạp chiếu"} - {ticket.showtime?.room?.name || "Phòng chiếu"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                      {ticket.showtime?.startTime 
                                        ? new Date(ticket.showtime.startTime).toLocaleDateString('vi-VN', {
                                            day: '2-digit',
                                            month: '2-digit', 
                                            year: 'numeric'
                                          })
                                        : "Ngày chiếu"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>
                                      {ticket.showtime?.startTime 
                                        ? new Date(ticket.showtime.startTime).toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                          })
                                        : "Giờ chiếu"}
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <QrCode className="w-4 h-4" />
                                    <span className="font-mono text-orange-600">{ticket.bookingCode}</span>
                                  </div>
                                  <div>
                                    <span className="text-orange-500">Ghế: </span>
                                    <span className="font-medium text-orange-900">
                                      {Array.isArray(ticket.seats) ? ticket.seats.join(", ") : ticket.seats}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-orange-500">Tổng tiền: </span>
                                    <span className="font-semibold text-orange-700">
                                      {formatPrice(ticket.totalPrice)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-orange-200">
                                <div className="text-xs text-orange-500">
                                  Đặt lúc: {new Date(ticket.createdAt).toLocaleString('vi-VN')}
                                </div>
                                <div className="space-x-2">
                                  {ticket.status === "confirmed" && (
                                    <Button
                                      size="sm"
                                      className="bg-orange-500 hover:bg-orange-600 text-white"
                                      onClick={() => {
                                        setSelectedTicket(ticket);
                                        setShowTicketDialog(true);
                                      }}
                                    >
                                      <QrCode className="w-4 h-4 mr-1" />
                                      Xem vé
                                    </Button>
                                  )}
                                  {ticket.status === "pending" && (
                                    <>
                                      <Button
                                        size="sm"
                                        className="bg-orange-400 hover:bg-orange-500 text-orange-900"
                                      >
                                        Thanh toán
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-orange-300 text-orange-700"
                                        onClick={() => handleCancelTicket(ticket.id)}
                                        disabled={updateTicketMutation.isPending}
                                      >
                                        Hủy
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-orange-500">
                        <p>Bạn chưa đặt vé nào</p>
                        <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                          Đặt vé ngay
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Ticket Detail Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="max-w-md bg-orange-50 border-orange-200">
          <DialogHeader>
            <DialogTitle className="text-orange-900 text-center">Vé điện tử</DialogTitle>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="space-y-6">
              {/* QR Code Placeholder */}
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <QrCode size={120} className="text-orange-900" />
                </div>
              </div>
              
              {/* Ticket Information */}
              <div className="bg-orange-100 p-4 rounded-lg space-y-3">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-orange-900">
                    {selectedTicket.movie?.title || "Tên phim"}
                  </h3>
                  <p className="text-orange-700 text-sm">
                    Mã vé: {selectedTicket.bookingCode}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-orange-700">Rạp chiếu:</p>
                    <p className="text-orange-900 font-medium">
                      {selectedTicket.showtime?.room?.cinema?.name || "Rạp không xác định"}
                    </p>
                  </div>
                  <div>
                    <p className="text-orange-700">Phòng:</p>
                    <p className="text-orange-900 font-medium">
                      {selectedTicket.showtime?.room?.name || "Phòng không xác định"}
                    </p>
                  </div>
                  <div>
                    <p className="text-orange-700">Ngày chiếu:</p>
                    <p className="text-orange-900 font-medium">
                      {selectedTicket.showtime?.startTime 
                        ? new Date(selectedTicket.showtime.startTime).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                        : "Ngày không xác định"}
                    </p>
                  </div>
                  <div>
                    <p className="text-orange-700">Giờ chiếu:</p>
                    <p className="text-orange-900 font-medium">
                      {selectedTicket.showtime?.startTime 
                        ? new Date(selectedTicket.showtime.startTime).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : "Giờ không xác định"}
                    </p>
                  </div>
                  <div>
                    <p className="text-orange-700">Ghế:</p>
                    <p className="text-orange-900 font-medium">
                      {Array.isArray(selectedTicket.seats) 
                        ? selectedTicket.seats.join(", ") 
                        : selectedTicket.seats}
                    </p>
                  </div>
                  <div>
                    <p className="text-orange-700">Tổng tiền:</p>
                    <p className="text-orange-700 font-semibold">
                      {formatPrice(selectedTicket.totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-xs text-orange-500">
                Vui lòng xuất trình mã vé này tại rạp chiếu
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}