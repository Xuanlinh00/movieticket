import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Users } from "lucide-react";

export default function Cinemas() {
  const { data: cinemas, isLoading } = useQuery({
    queryKey: ["/api/cinemas"],
  });

  const { data: rooms } = useQuery({
    queryKey: ["/api/rooms"],
  });

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-orange-100 border-orange-200 animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-orange-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-orange-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-orange-200 rounded"></div>
                    <div className="h-4 bg-orange-200 rounded"></div>
                    <div className="h-4 bg-orange-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getCinemaRooms = (cinemaId: number) => {
    return rooms?.filter((room: any) => room.cinemaId === cinemaId) || [];
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-900 mb-2">Hệ thống rạp chiếu</h1>
          <p className="text-orange-700">Tìm rạp chiếu gần nhất với bạn</p>
        </div>

        {!cinemas || cinemas.length === 0 ? (
          <Card className="bg-orange-100 border-orange-200">
            <CardContent className="p-12 text-center">
              <MapPin className="mx-auto mb-4 text-orange-200" size={48} />
              <h3 className="text-xl font-semibold text-orange-900 mb-2">Chưa có rạp chiếu nào</h3>
              <p className="text-orange-700">Hệ thống rạp chiếu sẽ sớm được cập nhật</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cinemas.map((cinema: any) => {
              const cinemaRooms = getCinemaRooms(cinema.id);
              return (
                <Card key={cinema.id} className="bg-orange-100 border-orange-200 hover:border-orange-400 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-orange-900 text-xl">{cinema.name}</CardTitle>
                    <Badge variant="secondary" className="bg-orange-200 text-orange-900 w-fit">
                      {cinemaRooms.length} phòng chiếu
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="text-orange-500 mt-1 flex-shrink-0" size={16} />
                        <div>
                          <p className="text-orange-700 text-sm">Địa chỉ</p>
                          <p className="text-orange-900">{cinema.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Phone className="text-orange-500 mt-1 flex-shrink-0" size={16} />
                        <div>
                          <p className="text-orange-700 text-sm">Liên hệ</p>
                          <p className="text-orange-900">{cinema.phone || "1900 1234"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Clock className="text-orange-500 mt-1 flex-shrink-0" size={16} />
                        <div>
                          <p className="text-orange-700 text-sm">Giờ mở cửa</p>
                          <p className="text-orange-900">8:00 - 23:00 (Hàng ngày)</p>
                        </div>
                      </div>

                      {cinemaRooms.length > 0 && (
                        <div className="border-t border-orange-200 pt-4">
                          <p className="text-orange-700 text-sm mb-2">Phòng chiếu:</p>
                          <div className="flex flex-wrap gap-2">
                            {cinemaRooms.map((room: any) => (
                              <Badge key={room.id} variant="outline" className="bg-orange-200 text-orange-900 border-orange-300">
                                <Users size={12} className="mr-1" />
                                {room.name} ({room.capacity || 100} chỗ)
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

