import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function resetDatabase() {
  try {
    await client.connect();
    console.log('✓ Đã kết nối MongoDB');
    
    const db = client.db('cinemabook');
    
    // Xóa tất cả collections
    const collections = ['tickets', 'showtimes', 'movies', 'cinemas', 'rooms', 'users', 'reviews', 'promotions'];
    
    console.log('\nĐang xóa dữ liệu cũ...');
    for (const collectionName of collections) {
      const result = await db.collection(collectionName).deleteMany({});
      console.log(`  ✓ Đã xóa ${result.deletedCount} documents từ ${collectionName}`);
    }
    
    console.log('\n✅ Database đã được reset thành công!');
    console.log('\nBước tiếp theo:');
    console.log('1. Restart server: npm run dev');
    console.log('2. Server sẽ tự động tạo dữ liệu mẫu');
    console.log('3. Đăng nhập: admin@cinemabook.vn / password');
    console.log('4. Đặt vé mới để test');
    
  } catch (error) {
    console.error('❌ Lỗi khi reset database:', error);
  } finally {
    await client.close();
  }
}

resetDatabase();
