import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, Play } from "lucide-react";
import { MovieWithDetails } from "@/lib/types";

export default function ComingSoon() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["/api/movies"],
  });

  const comingSoonMovies = movies?.filter((movie: MovieWithDetails) => movie.status === "coming-soon") || [];

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-orange-100 border-orange-200 animate-pulse">
                <CardContent className="p-0">
                  <div className="h-96 bg-orange-200 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-orange-200 rounded mb-2"></div>
                    <div className="h-3 bg-orange-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-orange-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-900 mb-2">Phim sắp chiếu</h1>
          <p className="text-orange-700">Những bộ phim hay nhất sắp ra mắt</p>
        </div>

        {comingSoonMovies.length === 0 ? (
          <Card className="bg-orange-100 border-orange-200">
            <CardContent className="p-12 text-center">
              <Calendar className="mx-auto mb-4 text-orange-200" size={48} />
              <h3 className="text-xl font-semibold text-orange-900 mb-2">Chưa có phim sắp chiếu</h3>
              <p className="text-orange-700">Hãy quay lại sau để xem những bộ phim mới nhất</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonMovies.map((movie: MovieWithDetails) => (
              <Card key={movie.id} className="bg-orange-100 border-orange-200 hover:border-orange-400 transition-colors group">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={movie.posterUrl || "/placeholder-movie.jpg"} 
                      alt={movie.title}
                      className="w-full h-96 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="ghost" size="icon" className="text-orange-900 hover:text-orange-600">
                        <Play size={32} />
                      </Button>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-yellow-400 text-orange-900">
                      Sắp chiếu
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-orange-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {movie.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-orange-700">
                        <Calendar size={16} className="mr-2" />
                        <span>
                          {movie.releaseDate 
                            ? new Date(movie.releaseDate).toLocaleDateString('vi-VN')
                            : "Chưa xác định"
                          }
                        </span>
                      </div>
                      <div className="flex items-center text-orange-700">
                        <Clock size={16} className="mr-2" />
                        <span>{movie.duration} phút</span>
                      </div>
                      <div className="flex items-center text-orange-700">
                        <Star size={16} className="mr-2" />
                        <span>{movie.averageRating || "Chưa có đánh giá"}</span>
                      </div>
                    </div>
                    
                    <Badge variant="secondary" className="mb-4 bg-orange-200 text-orange-900">
                      {movie.genre}
                    </Badge>
                    
                    <p className="text-orange-700 text-sm mb-4 line-clamp-3">
                      {movie.description}
                    </p>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-orange-300 text-orange-900 hover:text-orange-600"
                      >
                        <Play className="mr-2" size={16} />
                        Trailer
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-orange-400 hover:bg-orange-500 text-orange-900"
                        disabled
                      >
                        Thông báo ra mắt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
