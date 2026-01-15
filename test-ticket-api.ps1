# Script test API quản lý vé
Write-Host "=== TEST API QUẢN LÝ VÉ ===" -ForegroundColor Green

# 1. Đăng nhập admin
Write-Host "`n1. Đăng nhập với tài khoản admin..." -ForegroundColor Yellow
$loginBody = @{
    email = "admin@cinemabook.vn"
    password = "password"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $loginBody

$token = $loginResponse.token
Write-Host "✓ Đăng nhập thành công! Token: $($token.Substring(0, 20))..." -ForegroundColor Green

# 2. Lấy danh sách vé
Write-Host "`n2. Lấy danh sách tất cả vé..." -ForegroundColor Yellow
$headers = @{
    "Authorization" = "Bearer $token"
}

try {
    $tickets = Invoke-RestMethod -Uri "http://localhost:5000/api/admin/all-tickets" `
        -Method GET `
        -Headers $headers

    Write-Host "✓ Lấy danh sách vé thành công!" -ForegroundColor Green
    Write-Host "Tổng số vé: $($tickets.Count)" -ForegroundColor Cyan

    if ($tickets.Count -gt 0) {
        Write-Host "`n=== THÔNG TIN VÉ ĐẦU TIÊN ===" -ForegroundColor Magenta
        $firstTicket = $tickets[0]
        
        Write-Host "Mã vé: $($firstTicket.bookingCode)" -ForegroundColor White
        Write-Host "Tổng tiền: $($firstTicket.totalPrice)đ" -ForegroundColor White
        Write-Host "Trạng thái: $($firstTicket.status)" -ForegroundColor White
        Write-Host "Ghế: $($firstTicket.seats -join ', ')" -ForegroundColor White
        
        # Kiểm tra customerInfo
        if ($firstTicket.customerInfo) {
            Write-Host "`nThông tin khách hàng:" -ForegroundColor Cyan
            Write-Host "  - Tên: $($firstTicket.customerInfo.name)" -ForegroundColor White
            Write-Host "  - Email: $($firstTicket.customerInfo.email)" -ForegroundColor White
            Write-Host "  - SĐT: $($firstTicket.customerInfo.phone)" -ForegroundColor White
        } else {
            Write-Host "`n⚠ Không có thông tin khách hàng!" -ForegroundColor Red
        }
        
        # Kiểm tra movie
        if ($firstTicket.movie) {
            Write-Host "`nThông tin phim:" -ForegroundColor Cyan
            Write-Host "  - Tên: $($firstTicket.movie.title)" -ForegroundColor White
            Write-Host "  - ID: $($firstTicket.movie.id)" -ForegroundColor White
        } else {
            Write-Host "`n⚠ Không có thông tin phim!" -ForegroundColor Red
        }
        
        # Kiểm tra showtime
        if ($firstTicket.showtime) {
            Write-Host "`nThông tin suất chiếu:" -ForegroundColor Cyan
            Write-Host "  - Giờ chiếu: $($firstTicket.showtime.startTime)" -ForegroundColor White
            Write-Host "  - Giá: $($firstTicket.showtime.price)đ" -ForegroundColor White
            
            if ($firstTicket.showtime.room) {
                Write-Host "  - Phòng: $($firstTicket.showtime.room.name)" -ForegroundColor White
                
                if ($firstTicket.showtime.room.cinema) {
                    Write-Host "  - Rạp: $($firstTicket.showtime.room.cinema.name)" -ForegroundColor White
                    Write-Host "  - Địa chỉ: $($firstTicket.showtime.room.cinema.address)" -ForegroundColor White
                } else {
                    Write-Host "  ⚠ Không có thông tin rạp!" -ForegroundColor Red
                }
            } else {
                Write-Host "  ⚠ Không có thông tin phòng!" -ForegroundColor Red
            }
        } else {
            Write-Host "`n⚠ Không có thông tin suất chiếu!" -ForegroundColor Red
        }
        
        # Tổng kết
        Write-Host "`n=== TỔNG KẾT ===" -ForegroundColor Magenta
        $hasCustomerInfo = $firstTicket.customerInfo -ne $null
        $hasMovie = $firstTicket.movie -ne $null
        $hasShowtime = $firstTicket.showtime -ne $null
        
        Write-Host "Thông tin khách hàng: $(if($hasCustomerInfo){'✓ OK'}else{'✗ THIẾU'})" -ForegroundColor $(if($hasCustomerInfo){'Green'}else{'Red'})
        Write-Host "Thông tin phim: $(if($hasMovie){'✓ OK'}else{'✗ THIẾU'})" -ForegroundColor $(if($hasMovie){'Green'}else{'Red'})
        Write-Host "Thông tin suất chiếu: $(if($hasShowtime){'✓ OK'}else{'✗ THIẾU'})" -ForegroundColor $(if($hasShowtime){'Green'}else{'Red'})
        
        if ($hasCustomerInfo -and $hasMovie -and $hasShowtime) {
            Write-Host "`n🎉 TẤT CẢ THÔNG TIN HIỂN THỊ ĐÚNG!" -ForegroundColor Green
        } else {
            Write-Host "`n⚠ VẪN CÒN THÔNG TIN BỊ THIẾU!" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠ Chưa có vé nào trong hệ thống!" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ Lỗi khi lấy danh sách vé: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== KẾT THÚC TEST ===" -ForegroundColor Green
