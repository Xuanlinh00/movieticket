import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isAuthenticated } from "@/lib/auth";
import { CreditCard, User, Phone, Mail, Tag, Ticket } from "lucide-react";
import { BookingData } from "@/lib/types";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Tên phải có ít nhất 2 ký tự").max(50, "Tên không được quá 50 ký tự"),
  customerPhone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
  customerEmail: z.string().email("Email không hợp lệ"),
  paymentMethod: z.enum(["cash", "card", "momo", "banking"]),
  promoCode: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  showtimeId: number;
  selectedSeats: string[];
  totalPrice: number;
  onSuccess: () => void;
  onBack: () => void;
}

export default function BookingForm({ showtimeId, selectedSeats, totalPrice, onSuccess, onBack }: BookingFormProps) {
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [appliedPromo, setAppliedPromo] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user is authenticated
  if (!isAuthenticated()) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <User className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">Vui lòng đăng nhập</h3>
            <p className="text-gray-400 mb-4">Bạn cần đăng nhập để có thể đặt vé xem phim</p>
            <div className="space-x-2">
              <Button onClick={() => window.location.href = "/login"} className="bg-red-600 hover:bg-red-700">
                Đăng nhập
              </Button>
              <Button variant="outline" onClick={onBack}>
                Quay lại
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      paymentMethod: "cash",
      promoCode: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const bookingData: BookingData = {
        showtimeId,
        seats: selectedSeats,
        totalPrice: (totalPrice - promoDiscount).toString(),
        paymentMethod: data.paymentMethod,
        customerInfo: {
          name: data.customerName,
          phone: data.customerPhone,
          email: data.customerEmail,
        },
      };

      const response = await apiRequest("POST", "/api/bookings", bookingData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Đặt vé thành công!",
        description: "Vé của bạn đã được đặt thành công. Kiểm tra email để xem chi tiết.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/all-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/showtimes"] });
      onSuccess();
    },
    onError: (error: any) => {
      let errorMessage = "Có lỗi xảy ra khi đặt vé. Vui lòng thử lại.";

      if (error.message?.includes("already booked")) {
        errorMessage = "Một số ghế đã được đặt trước. Vui lòng chọn ghế khác.";
      } else if (error.message?.includes("not available")) {
        errorMessage = "Ghế bạn chọn không còn trống. Vui lòng chọn ghế khác.";
      } else if (error.message?.includes("Invalid booking data")) {
        errorMessage = "Thông tin đặt vé không hợp lệ. Vui lòng kiểm tra lại.";
      } else if (error.message?.includes("Unauthorized")) {
        errorMessage = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
      }

      toast({
        title: "Lỗi đặt vé",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const promoMutation = useMutation({
    mutationFn: async (promoCode: string) => {
      const response = await apiRequest("POST", "/api/promotions/validate", { 
        code: promoCode, 
        totalPrice 
      });
      return response.json();
    },
    onSuccess: (data) => {
      setPromoDiscount(data.discount);
      setAppliedPromo(data.code);
      toast({
        title: "Áp dụng mã khuyến mãi thành công!",
        description: `Bạn được giảm ${formatPrice(data.discount)}`,
      });
    },
    onError: () => {
      toast({
        title: "Mã khuyến mãi không hợp lệ",
        description: "Vui lòng kiểm tra lại mã khuyến mãi.",
        variant: "destructive",
      });
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleApplyPromo = () => {
    const promoCode = form.getValues("promoCode");
    if (promoCode && promoCode.trim()) {
      // Reset previous promo if applying new one
      if (appliedPromo && appliedPromo !== promoCode.trim()) {
        setPromoDiscount(0);
        setAppliedPromo("");
      }
      promoMutation.mutate(promoCode.trim());
    } else {
      toast({
        title: "Mã khuyến mãi trống",
        description: "Vui lòng nhập mã khuyến mãi.",
        variant: "destructive",
      });
    }
  };

  const handleRemovePromo = () => {
    setPromoDiscount(0);
    setAppliedPromo("");
    form.setValue("promoCode", "");
    toast({
      title: "Đã hủy mã khuyến mãi",
      description: "Mã khuyến mãi đã được hủy.",
    });
  };

  const onSubmit = (data: BookingFormData) => {
    // Validate that we have selected seats
    if (selectedSeats.length === 0) {
      toast({
        title: "Chưa chọn ghế",
        description: "Vui lòng chọn ít nhất một ghế.",
        variant: "destructive",
      });
      return;
    }

    // Validate total price
    if (totalPrice <= 0) {
      toast({
        title: "Giá vé không hợp lệ",
        description: "Vui lòng kiểm tra lại thông tin đặt vé.",
        variant: "destructive",
      });
      return;
    }

    bookingMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Booking Summary */}
      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-900 flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            Thông tin đặt vé
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-orange-700">Ghế đã chọn:</span>
              <div className="text-orange-900 font-medium">
                {selectedSeats.join(", ")}
              </div>
            </div>
            <div>
              <span className="text-orange-700">Số lượng:</span>
              <div className="text-orange-900 font-medium">{selectedSeats.length} ghế</div>
            </div>
          </div>

          <Separator className="bg-orange-200" />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-orange-700">Tạm tính:</span>
              <span className="text-orange-900">{formatPrice(totalPrice)}</span>
            </div>

            {promoDiscount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span>Giảm giá ({appliedPromo}):</span>
                <div className="flex items-center gap-2">
                  <span>-{formatPrice(promoDiscount)}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemovePromo}
                    className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-orange-900">Tổng cộng:</span>
              <span className="text-red-600">{formatPrice(totalPrice - promoDiscount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-900 flex items-center gap-2">
            <User className="w-5 h-5" />
            Thông tin khách hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="text-orange-900">Họ và tên</Label>
              <Input
                id="customerName"
                {...form.register("customerName")}
                className="bg-orange-100 border-orange-200 text-orange-900"
                placeholder="Nhập họ và tên"
              />
              {form.formState.errors.customerName && (
                <p className="text-red-400 text-sm">{form.formState.errors.customerName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerPhone" className="text-orange-900">Số điện thoại</Label>
                <Input
                  id="customerPhone"
                  {...form.register("customerPhone")}
                  className="bg-orange-100 border-orange-200 text-orange-900"
                  placeholder="0123456789"
                />
                {form.formState.errors.customerPhone && (
                  <p className="text-red-400 text-sm">{form.formState.errors.customerPhone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail" className="text-orange-900">Email</Label>
                <Input
                  id="customerEmail"
                  {...form.register("customerEmail")}
                  className="bg-orange-100 border-orange-200 text-orange-900"
                  placeholder="email@example.com"
                />
                {form.formState.errors.customerEmail && (
                  <p className="text-red-400 text-sm">{form.formState.errors.customerEmail.message}</p>
                )}
              </div>
            </div>

            {/* Promo Code */}
            <div className="space-y-2">
              <Label htmlFor="promoCode" className="text-orange-900">Mã khuyến mãi (tùy chọn)</Label>
              <div className="flex gap-2">
                <Input
                  id="promoCode"
                  {...form.register("promoCode")}
                  className={`bg-orange-100 border-orange-200 text-orange-900 flex-1 ${
                    appliedPromo ? 'border-green-500 bg-green-50' : ''
                  }`}
                  placeholder="Nhập mã khuyến mãi"
                  disabled={appliedPromo !== ""}
                />
                {appliedPromo ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRemovePromo}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Hủy
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={promoMutation.isPending}
                    className="border-orange-200 text-orange-900 hover:bg-orange-100"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    {promoMutation.isPending ? "Đang kiểm tra..." : "Áp dụng"}
                  </Button>
                )}
              </div>
              {appliedPromo && (
                <p className="text-green-600 text-sm">✓ Mã khuyến mãi "{appliedPromo}" đã được áp dụng</p>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label className="text-orange-900">Phương thức thanh toán</Label>
              <Select onValueChange={(value) => form.setValue("paymentMethod", value as any)}>
                <SelectTrigger className="bg-orange-100 border-orange-200 text-orange-900">
                  <SelectValue placeholder="Chọn phương thức thanh toán" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Tiền mặt tại rạp</SelectItem>
                  <SelectItem value="card">Thẻ tín dụng</SelectItem>
                  <SelectItem value="momo">Ví MoMo</SelectItem>
                  <SelectItem value="banking">Chuyển khoản ngân hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={bookingMutation.isPending}
                className="flex-1 border-orange-200 text-orange-900 hover:bg-orange-100 disabled:opacity-50"
              >
                Quay lại
              </Button>
              <Button
                type="submit"
                disabled={bookingMutation.isPending || selectedSeats.length === 0}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {bookingMutation.isPending ? "Đang xử lý..." : `Thanh toán ${formatPrice(totalPrice - promoDiscount)}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}